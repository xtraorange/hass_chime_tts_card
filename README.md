# Chime TTS Card

**Chime TTS Card** is a custom Lovelace card for Home Assistant that allows you to easily send text-to-speech (TTS) messages using the Chime TTS integration.

## Installation

### HACS Installation

1. Make sure you have [HACS](https://hacs.xyz/) installed in your Home Assistant setup.
2. Add this repository as a custom repository in HACS.
   - Go to HACS > Integrations > Click on the three dots in the top right > Custom repositories.
   - Add the repository URL: `https://github.com/yourusername/hass_chime_tts_card`
   - Select the category as **Lovelace**.
3. Find **Chime TTS Card** in the HACS store and install it.
4. After installation, make sure to refresh your browser and clear cache if needed.

### Manual Installation

1. Download the `chime-tts-card.js` file from the `dist` folder in this repository.
2. Place the file in your `config/www/community/chime-tts-card/` directory.
3. Add the following to your Lovelace resources:

```yaml
- url: /hacsfiles/chime-tts-card/chime-tts-card.js
  type: module
```

4. Refresh your browser and clear cache if necessary.

## Configuration

To add this card to your Lovelace dashboard, use the following configuration in the UI or YAML editor:

```yaml
type: 'custom:chime-tts-card'
```

### Card Configuration Options

- **message**: The message to be spoken.
- **volume_level**: Set the volume level for the TTS playback.
- **media**: Specify the media to play before the TTS message.
- **media_type**: Define the type of media.
- **delay**: Set a delay before the TTS message is spoken (in milliseconds).
- **override_playing**: Whether to override currently playing media.

### Example Usage

```yaml
type: 'custom:chime-tts-card'
message: 'Hello, this is a test message'
volume_level: 0.8
media: 'http://example.com/sound.mp3'
media_type: 'audio/mp3'
delay: 1000
override_playing: true
```

## Issues and Contributions

If you encounter any issues or have feature requests, please open an issue in the [GitHub repository](https://github.com/yourusername/hass_chime_tts_card).

Contributions are welcome! Please feel free to submit a pull request.

## License

This project is licensed under the MIT License.
