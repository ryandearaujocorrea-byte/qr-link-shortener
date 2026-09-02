const express = require('express');
const QRCode = require('qrcode');
const sqlite3 = require('sqlite3').verbose();
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Database setup
const db = new sqlite3.Database('./links.db', (err) => {
  if (err) console.error(err.message);
  console.log('Conectado ao banco de dados SQLite');
});

// Criar tabela se não existir
db.run(`
  CREATE TABLE IF NOT EXISTS links (
    id TEXT PRIMARY KEY,
    original_url TEXT NOT NULL,
    short_code TEXT UNIQUE NOT NULL,
    qr_code TEXT,
    clicks INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    expires_at DATETIME
  )
`);

// Rotas

// 1. Gerar URL encurtada + QR Code
app.post('/api/shorten', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL é obrigatória' });
  }

  try {
    const id = uuidv4();
    const shortCode = Math.random().toString(36).substring(2, 8);
    const shortUrl = `http://localhost:${PORT}/${shortCode}`;

    // Gerar QR Code
    const qrCode = await QRCode.toDataURL(shortUrl);

    // Salvar no banco
    db.run(
      `INSERT INTO links (id, original_url, short_code, qr_code) VALUES (?, ?, ?, ?)`,
      [id, url, shortCode, qrCode],
      (err) => {
        if (err) {
          return res.status(500).json({ error: 'Erro ao salvar link' });
        }
        res.json({
          short_url: shortUrl,
          short_code: shortCode,
          qr_code: qrCode,
          original_url: url
        });
      }
    );
  } catch (err) {
    res.status(500).json({ error: 'Erro ao gerar QR Code' });
  }
});

// 2. Redirecionar para URL original + contar cliques
app.get('/:shortCode', (req, res) => {
  const { shortCode } = req.params;

  db.get(
    `SELECT original_url, clicks FROM links WHERE short_code = ?`,
    [shortCode],
    (err, row) => {
      if (err || !row) {
        return res.status(404).json({ error: 'Link não encontrado' });
      }

      // Atualizar cliques
      db.run(
        `UPDATE links SET clicks = clicks + 1 WHERE short_code = ?`,
        [shortCode]
      );

      res.redirect(row.original_url);
    }
  );
});

// 3. Dashboard - Listar todos os links
app.get('/api/links', (req, res) => {
  db.all(
    `SELECT id, original_url, short_code, clicks, created_at FROM links ORDER BY created_at DESC`,
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao buscar links' });
      }
      res.json(rows);
    }
  );
});

// 4. Obter detalhes de um link
app.get('/api/links/:shortCode', (req, res) => {
  const { shortCode } = req.params;

  db.get(
    `SELECT * FROM links WHERE short_code = ?`,
    [shortCode],
    (err, row) => {
      if (err || !row) {
        return res.status(404).json({ error: 'Link não encontrado' });
      }
      res.json(row);
    }
  );
});

// 5. Deletar link
app.delete('/api/links/:shortCode', (req, res) => {
  const { shortCode } = req.params;

  db.run(
    `DELETE FROM links WHERE short_code = ?`,
    [shortCode],
    (err) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao deletar link' });
      }
      res.json({ message: 'Link deletado com sucesso' });
    }
  );
});

// Servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📊 Dashboard em http://localhost:${PORT}/dashboard.html`);
});
