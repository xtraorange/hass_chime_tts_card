class ChimeTTSCard extends HTMLElement {
  set hass(hass) {
    if (!this.content) {
      this.innerHTML = `
        <div id="container">
          <label for="message">Message:</label>
          <input type="text" id="message" name="message" value="${this._config.message || ''}"><br>

          <label for="volume_level">Volume Level:</label>
          <input type="range" id="volume_level" name="volume_level" min="0" max="1" step="0.01" value="${this._config.volume_level || 0.5}"><br>

          <label for="media">Media:</label>
          <input type="text" id="media" name="media" value="${this._config.media || ''}"><br>

          <label for="media_type">Media Type:</label>
          <input type="text" id="media_type" name="media_type" value="${this._config.media_type || ''}"><br>

          <label for="delay">Delay (ms):</label>
          <input type="number" id="delay" name="delay" min="0" value="${this._config.delay || 0}"><br>

          <label for="override_playing">Override Playing:</label>
          <input type="checkbox" id="override_playing" name="override_playing" ${this._config.override_playing ? 'checked' : ''}><br>

          <div id="target-container"></div>

          <button id="send-btn">Send TTS</button>
        </div>
      `;
      this.content = this.querySelector("#container");

      this.querySelector('#send-btn').addEventListener('click', () => {
        this._sendTTS(hass);
      });

      this._renderTargetSelector(hass);
    }
  }

  setConfig(config) {
    this._config = config;
  }

  getCardSize() {
    return 2;
  }

  _sendTTS(hass) {
    const message = this.querySelector('#message').value;
    const volume_level = this.querySelector('#volume_level').value;
    const media = this.querySelector('#media').value;
    const media_type = this.querySelector('#media_type').value;
    const delay = this.querySelector('#delay').value;
    const override_playing = this.querySelector('#override_playing').checked;
    const target = this.querySelector('#target').value || this._config.default_target;

    hass.callService('chime_tts', 'say', {
      message: message,
      volume_level: parseFloat(volume_level),
      media: media,
      media_type: media_type,
      delay: parseInt(delay),
      override_playing: override_playing,
      target: target
    });
  }

  _renderTargetSelector(hass) {
    const targetContainer = this.querySelector('#target-container');
    const targetConfig = this._config.target_ui || 'none';

    if (targetConfig === 'none') {
      return;
    }

    const mediaPlayers = Object.keys(hass.states).filter(eid => eid.startsWith('media_player.'));
    let selectorHTML = '';

    if (targetConfig === 'dropdown') {
      selectorHTML = `<select id="target">${mediaPlayers.map(player => `<option value="${player}">${hass.states[player].attributes.friendly_name}</option>`).join('')}</select>`;
    } else if (targetConfig === 'multiselect') {
      selectorHTML = `<select id="target" multiple>${mediaPlayers.map(player => `<option value="${player}">${hass.states[player].attributes.friendly_name}</option>`).join('')}</select>`;
    }

    targetContainer.innerHTML = `
      <label for="target">Target:</label>
      ${selectorHTML}
    `;
  }

  static getConfigElement() {
    return document.createElement('chime-tts-card-editor');
  }

  static getStubConfig() {
    return {};
  }
}

class ChimeTTSCardEditor extends HTMLElement {
  setConfig(config) {
    this._config = config;
    this.render();
  }

  render() {
    this.innerHTML = `
      <div>
        <label for="default_target">Default Target:</label>
        <input type="text" id="default_target" name="default_target" value="${this._config.default_target || ''}"><br>

        <label for="target_ui">Target UI:</label>
        <select id="target_ui" name="target_ui">
          <option value="none" ${this._config.target_ui === 'none' ? 'selected' : ''}>None</option>
          <option value="dropdown" ${this._config.target_ui === 'dropdown' ? 'selected' : ''}>Dropdown</option>
          <option value="multiselect" ${this._config.target_ui === 'multiselect' ? 'selected' : ''}>Multiselect</option>
        </select><br>

        <label for="message">Default Message:</label>
        <input type="text" id="message" name="message" value="${this._config.message || ''}"><br>

        <label for="volume_level">Default Volume Level:</label>
        <input type="range" id="volume_level" name="volume_level" min="0" max="1" step="0.01" value="${this._config.volume_level || 0.5}"><br>

        <label for="media">Default Media:</label>
        <input type="text" id="media" name="media" value="${this._config.media || ''}"><br>

        <label for="media_type">Default Media Type:</label>
        <input type="text" id="media_type" name="media_type" value="${this._config.media_type || ''}"><br>

        <label for="delay">Default Delay (ms):</label>
        <input type="number" id="delay" name="delay" min="0" value="${this._config.delay || 0}"><br>

        <label for="override_playing">Default Override Playing:</label>
        <input type="checkbox" id="override_playing" name="override_playing" ${this._config.override_playing ? 'checked' : ''}><br>
      </div>
    `;
  }

  set hass(hass) {
    this.hass = hass;
  }

  get value() {
    return {
      default_target: this.querySelector('#default_target').value,
      target_ui: this.querySelector('#target_ui').value,
      message: this.querySelector('#message').value,
      volume_level: this.querySelector('#volume_level').value,
      media: this.querySelector('#media').value,
      media_type: this.querySelector('#media_type').value,
      delay: this.querySelector('#delay').value,
      override_playing: this.querySelector('#override_playing').checked
    };
  }

  set value(value) {
    this._config = value;
    this.render();
  }
}

// Define the custom card
customElements.define('chime-tts-card', ChimeTTSCard);

// Register the card with the UI so it appears in the Lovelace card picker
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'chime-tts-card',
  name: 'Chime TTS Card',
  description: 'A custom card for sending ChimeTTS messages',
});

customElements.define('chime-tts-card-editor', ChimeTTSCardEditor);
