const express = require('express');
const ytdl = require('@distube/ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Endpoint to get video info
app.get('/video-info', async (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl || !ytdl.validateURL(videoUrl)) {
    return res.status(400).json({ error: 'Invalid YouTube URL' });
  }

  try {
    const info = await ytdl.getInfo(videoUrl);
    const details = {
      title: info.videoDetails.title,
      channel: info.videoDetails.author.name,
      thumbnail: info.videoDetails.thumbnails[info.videoDetails.thumbnails.length - 1].url, // Get highest quality thumbnail
    };
    res.json(details);
  } catch (error) {
    console.error('Error fetching video info:', error);
    res.status(500).json({ error: 'Error fetching video information.' });
  }
});

// Endpoint to download the converted MP3
app.get('/download', (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl || !ytdl.validateURL(videoUrl)) {
    return res.status(400).send('Invalid YouTube URL');
  }

  const title = req.query.title || 'audio';
  const sanitizedTitle = title.replace(/[\u0000-\u007F]/g, "").replace(/[/\\?%*:|"<>]/g, '-'); // Sanitize for filename

  res.header('Content-Disposition', `attachment; filename="${sanitizedTitle}.mp3"`);
  res.header('Content-Type', 'audio/mpeg');

  const audioStream = ytdl(videoUrl, { filter: 'audioonly', quality: 'highestaudio' });

  ffmpeg(audioStream)
    .audioBitrate('320k') // Set high quality bitrate
    .format('mp3')
    .on('error', (err) => {
      console.error('FFmpeg error:', err);
      // Don't try to send headers/status after stream has started
    })
    .pipe(res, { end: true });
});

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
