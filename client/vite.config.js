import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import OpenAI from 'openai'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load .env from the project root (one level above client/)
  const env = loadEnv(mode, path.resolve(__dirname, '..'), '')

  return {
    envDir: '../',  // Load .env from project root (one level up from client/)
    plugins: [
      react(),
      {
        name: 'configure-server',
        configureServer(server) {
          server.middlewares.use('/api/chat', async (req, res, next) => {
            if (req.method !== 'POST') {
              res.statusCode = 405
              res.end('Method Not Allowed')
              return
            }

            // Simple body parser
            const buffers = []
            for await (const chunk of req) {
              buffers.push(chunk)
            }
            const data = Buffer.concat(buffers).toString()

            try {
              const { messages } = JSON.parse(data || '{}')

              const apiKey = env.OPENAI_API_KEY || env.VITE_OPENAI_API_KEY;
              if (!apiKey) {
                console.error("Missing OPENAI_API_KEY in .env file")
                res.statusCode = 500
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ error: 'Missing OPENAI_API_KEY in .env file' }))
                return
              }

              const openai = new OpenAI({
                apiKey,
              })

              const completion = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [
                  {
                    role: 'system',
                    content: 'You are a knowledgeable and friendly travel assistant specializing in Mysuru (Mysore), India. Help users discover hidden gems, local culture, authentic food experiences, heritage sites, and travel tips. Be concise, enthusiastic, and provide specific recommendations when possible.'
                  },
                  ...(messages || [])
                ],
                temperature: 0.7,
                max_tokens: 500,
              })

              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({
                message: completion.choices[0].message.content,
                usage: completion.usage,
              }))

            } catch (error) {
              console.error('API Error:', error)
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: error.message || 'Internal Server Error' }))
            }
          })
        }
      }
    ],
  }
})
