const LightsMusic = {
  synth: null,
  notes: [
    'D4', 'G4', 'G4', 'A4', 'G4', 'F#4',  'E4', 'E4',
    'E4', 'A4', 'A4', 'B4', 'A4',  'G4', 'F#4', 'D4',
    'D4', 'B4', 'B4', 'C5', 'B4',  'A4',  'G4', 'E4',
    'D4', 'D4', 'E4', 'A4', 'F#4', 'G4'
  ],

  init() {
    this.synth = new Tone.FMSynth({
      harmonicity: 2.5,
      modulationIndex: 8,
      oscillator: {
        type: "sine"
      },
      envelope: {
        attack: 0.002,
        decay: 3,
        sustain: 0,
        release: 3
      },
      modulation: {
        type: "sine"
      },
      modulationEnvelope: {
        attack: 0.02,
        decay: 1,
        sustain: 0,
        release: 1
      }
    }).toDestination();

    const reverb = new Tone.Reverb({
      decay: 3,
      preDelay: 0.01
    }).toDestination();

    this.synth.connect(reverb);

    const bulbsContainer = document.querySelector('#bulbs');

    this.notes.forEach((note) => {
      const li = document.createElement('li');
      li.appendChild(document.createElement('div'));
      li.dataset.note = note;

      li.addEventListener('mouseenter', (e) => {
        const note = e.currentTarget.dataset.note;
        this.synth.triggerAttackRelease(note, '8n', Tone.now());
      });

      bulbsContainer.appendChild(li);
    });

    const startHandler = async () => {
      if (Tone.context.state !== 'running') {
        await Tone.start();
      }
      document.removeEventListener('click', startHandler);
    };
    document.addEventListener('click', startHandler);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  LightsMusic.init();
});
