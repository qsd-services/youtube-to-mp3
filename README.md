# SonicFetch - YouTube to MP3 Converter

SonicFetch is a simple web application that allows you to convert YouTube videos into high-quality 320kbps MP3 files for download.

## Features

- **Simple Interface**: Paste a YouTube link and get a download button.
- **High Quality**: Converts audio to 320kbps MP3 format.
- **Dynamic Info**: Fetches video title, channel, and thumbnail before downloading.

## Prerequisites

Before you begin, you need to have the following installed on your system:

- [Node.js](https://nodejs.org/) (which includes npm)
- [ffmpeg](https://ffmpeg.org/download.html): This is a critical dependency for handling the audio conversion. Please ensure it is installed and accessible in your system's PATH.

## Setup and Installation

1.  **Clone the repository or download the files.**

2.  **Navigate to the project directory:**
    ```bash
    cd sonic-fetch
    ```

3.  **Install the required npm packages:**
    ```bash
    npm install
    ```

## Running the Application

1.  **Start the server:**
    ```bash
    node index.js
    ```

2.  **Open your web browser** and navigate to:
    [http://localhost:3000](http://localhost:3000)

3.  Paste a YouTube video URL into the input box, click "Convert", and then click "Download MP3".

## How It Works

- **Frontend**: A single `index.html` file with Tailwind CSS for styling and vanilla JavaScript to handle user interaction.
- **Backend**: An `Express.js` server that provides two main endpoints:
    - `/video-info`: Fetches video metadata from YouTube.
    - `/download`: Streams the video audio, pipes it through `ffmpeg` for MP3 conversion, and sends the result to the client.
- **YouTube Interaction**: Uses `@distube/ytdl-core` to get video information and audio streams from YouTube.
- **Conversion**: Uses `fluent-ffmpeg` as a wrapper for the `ffmpeg` command-line tool to handle the audio transcoding.
