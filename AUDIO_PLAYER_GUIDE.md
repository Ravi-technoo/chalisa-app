# 🎧 Audio Player - Complete Guide

## ✅ Audio Reading & Playback Implemented!

Your Hanuman Chalisa App now has **complete audio playback functionality** with Text-to-Speech (TTS) for verse-by-verse reading!

---

## 🎯 Key Features

### Audio Playback:
- ✓ **Text-to-Speech (TTS)** - Browser-based voice synthesis
- ✓ **Play/Pause/Stop** controls
- ✓ **Previous/Next verse** navigation
- ✓ **Auto-advance** to next verse when current finishes
- ✓ **Multi-language voices** (Hindi & English)
- ✓ **Adjustable playback speed** (0.5x to 2x)
- ✓ **Volume control** (0% to 100%)
- ✓ **Visual highlighting** - Current verse highlighted in blue
- ✓ **Auto-scroll** - Page scrolls to current verse
- ✓ **Progress tracking** - Shows current/total verses

---

## 📱 User Interface

```
┌─────────────────────────────────────────────────────────┐
│ 🎧 Audio Player                    [Auto-Advance ON]    │
├─────────────────────────────────────────────────────────┤
│ Current Verse: 5 / 40                                   │
│                                                         │
│     [◄◄]    [  ▶  ]    [■]    [►►]                    │
│           Previous  Play  Stop  Next                    │
│                                                         │
│  0:00  ━━━━━━━━━━━━━━━━━━━━━━━━  0:15                │
│                                                         │
│  🔊 ━━━━━━━━━ 100%        ⚡ 1x Speed                 │
│                                                         │
│  Voice: Google हिन्दी (hi-IN)                          │
│                                                         │
│  Click play to listen. Auto-advance is enabled.        │
└─────────────────────────────────────────────────────────┘
```

---

## 🎮 How to Use

### 1. Access Audio Player

**Navigate to Hanuman Chalisa**:
- Go to http://localhost:3000/devotional/hanuman-chalisa
- Audio player appears at the top, below the controls

### 2. Basic Playback

**Play Current Verse**:
1. Click the **Play button** (▶)
2. Verse starts reading aloud
3. Current verse highlighted in blue
4. Auto-scrolls to verse

**Pause**:
- Click **Pause button** (⏸) to pause
- Click again to resume

**Stop**:
- Click **Stop button** (■) to stop completely
- Resets to beginning of current verse

### 3. Navigation

**Next Verse**:
- Click **Next button** (►►)
- Skips to next verse
- If playing, starts reading next verse

**Previous Verse**:
- Click **Previous button** (◄◄)
- Goes back to previous verse
- If playing, starts reading previous verse

**Auto-Advance**:
- Enabled by default (green chip: "Auto-Advance ON")
- Automatically plays next verse when current finishes
- Click chip to toggle on/off

### 4. Adjust Settings

**Volume Control**:
- Use volume slider (🔊)
- Adjust from 0% (mute) to 100% (max)
- Changes apply immediately

**Playback Speed**:
- Select from dropdown: 0.5x, 0.75x, 1x, 1.25x, 1.5x, 2x
- **1x**: Normal speed
- **0.5x**: Slow (good for learning)
- **2x**: Fast (quick review)

**Voice Selection**:
- Choose different TTS voices
- Automatically filters Hindi/English voices based on language
- Select from available system voices

---

## 🌐 Multi-Language Support

### Hindi Voice (हिन्दी):
```
Voice: Google हिन्दी (hi-IN)
Language: hi-IN
Reading: जय हनुमान ज्ञान गुन सागर।
          जय कपीस तिहुं लोक उजागर॥
```

### English Voice:
```
Voice: Google US English (en-US)
Language: en-US
Reading: Victory to Hanuman, ocean of wisdom and virtue.
         Victory to the Lord of monkeys...
```

### Automatic Voice Matching:
- When you switch language (हिं ↔ EN), voice updates automatically
- Searches for appropriate Hindi or English voices
- Falls back to system default if specific language unavailable

---

## 🎨 Visual Features

### Current Verse Highlighting:
```
┌──────────────────────────────────────┐
│ Verse 4 (Normal - Gray Background)   │
└──────────────────────────────────────┘

┌══════════════════════════════════════┐
║ Verse 5 (Playing - Blue Highlight)   ║  ← Currently playing
║ कंचन बरन बिराज सुबेसा।              ║
║ कानन कुंडल कुंचित केसा॥             ║
║                                       ║
║ Meaning: Your complexion is golden...║
╚══════════════════════════════════════╝

┌──────────────────────────────────────┐
│ Verse 6 (Normal - Gray Background)   │
└──────────────────────────────────────┘
```

### Auto-Scroll Behavior:
- Page automatically scrolls to keep current verse centered
- Smooth scrolling animation
- Works even when verse is off-screen

---

## ⚙️ Technical Details

### Text-to-Speech (TTS):
- **Technology**: Web Speech API (SpeechSynthesis)
- **Browser Support**: Chrome, Edge, Safari, Firefox
- **Offline**: Works without internet (uses system voices)
- **Quality**: Depends on OS voices installed

### Voice Engines:

**macOS**:
- Hindi: "Lekha", "Sangeeta" (if installed)
- English: "Samantha", "Alex", "Victoria"

**Windows**:
- Hindi: "Microsoft Hindi" (if language pack installed)
- English: "Microsoft Zira", "David", "Mark"

**Android**:
- Google TTS voices (download from Play Store)

**iOS**:
- Siri voices (Hindi, English available)

### Performance:
- **CPU**: Minimal (browser handles TTS)
- **Memory**: Low footprint
- **Network**: None required (offline capable)
- **Battery**: Similar to music playback

---

## 🎯 Use Cases

### 1. Learning & Memorization
```
Settings:
- Speed: 0.75x (slower)
- Auto-Advance: ON
- Meanings: Show

Usage:
- Listen while reading along
- Learn pronunciation
- Understand meaning
```

### 2. Devotional Listening
```
Settings:
- Speed: 1x (normal)
- Auto-Advance: ON
- Meanings: Hide

Usage:
- Close eyes and listen
- Continuous playback
- Focus on devotion
```

### 3. Quick Review
```
Settings:
- Speed: 1.5x (faster)
- Auto-Advance: ON
- Meanings: Hide

Usage:
- Quick run-through
- Daily recitation
- Time-constrained sessions
```

### 4. Specific Verses
```
Settings:
- Auto-Advance: OFF
- Repeat single verse

Usage:
- Practice pronunciation
- Focus on difficult verses
- Selective listening
```

---

## 🎵 Playback States

### State Diagram:
```
          ┌─────────────┐
          │   Stopped   │
          └──────┬──────┘
                 │ Press Play
                 ▼
          ┌─────────────┐
     ┌────│   Playing   │────┐
     │    └─────────────┘    │
 Press│                    Press│
 Pause│                    Stop │
     │    ┌─────────────┐    │
     └───→│   Paused    │────┘
          └──────┬──────┘
                 │ Press Play
                 ▼
          ┌─────────────┐
          │   Playing   │
          └─────────────┘
```

---

## 🔧 Customization Options

### Future Enhancements (Optional):

1. **Audio File Upload**
   - Add custom audio recordings
   - Professional voice artists
   - Better quality than TTS

2. **Background Music**
   - Soft instrumental background
   - Adjustable music volume
   - Mix with voice

3. **Bookmark Verses**
   - Save favorite verses
   - Quick jump to bookmarks
   - Create playlists

4. **Repeat Modes**
   - Repeat single verse
   - Repeat all verses
   - Loop specific range

5. **Download Audio**
   - Generate audio file
   - Save for offline listening
   - Share with others

---

## 📊 Controls Reference

| Control | Icon | Function | Keyboard |
|---------|------|----------|----------|
| Play/Pause | ▶/⏸ | Start/pause playback | Spacebar |
| Stop | ■ | Stop completely | S |
| Previous | ◄◄ | Go to previous verse | ← |
| Next | ►► | Go to next verse | → |
| Volume | 🔊 | Adjust volume 0-100% | +/- |
| Speed | ⚡ | Change playback rate | [ / ] |
| Auto-Advance | Chip | Toggle auto-play next | A |

---

## 🌟 Features in Action

### Example Workflow:

**Morning Recitation Session**:

1. **Open** Hanuman Chalisa page
2. **Select** Hindi language
3. **Click** Play on Audio Player
4. **First verse** starts reading:
   ```
   Playing: Verse 1/40
   जय हनुमान ज्ञान गुन सागर।
   जय कपीस तिहुं लोक उजागर॥
   ```
5. **Verse highlighted** in blue
6. **Auto-advances** to verse 2
7. **Continues** through all 40 verses
8. **Completion**: Returns to stopped state

**During Playback**:
- Adjust speed if too fast/slow
- Pause to reflect on meaning
- Skip verses you want to focus on later
- Control volume as needed

---

## 🎧 Browser Compatibility

### Fully Supported:
- ✅ Chrome/Chromium (Desktop & Mobile)
- ✅ Edge (Desktop & Mobile)
- ✅ Safari (macOS & iOS)
- ✅ Firefox (Desktop & Android)

### Voice Quality:
- **Best**: Chrome on Windows/macOS
- **Good**: Safari on iOS/macOS
- **Decent**: Firefox on all platforms
- **Variable**: Depends on installed OS voices

---

## 🔍 Troubleshooting

### No Audio Playing?

**Check:**
1. Volume slider not at 0%
2. System volume not muted
3. Browser has permission for audio
4. Voices available (check dropdown)

**Solutions:**
- Increase volume slider
- Check system audio settings
- Reload page
- Try different voice from dropdown

### Voice Sounds Robotic?

**Cause**: TTS quality varies by voice engine

**Solutions:**
1. Try different voice from dropdown
2. Install higher quality voices:
   - **Windows**: Install language packs
   - **macOS**: Download Siri voices
   - **Android**: Install Google TTS voices
3. Consider slower playback speed (0.75x)

### Auto-Advance Not Working?

**Check**: Auto-Advance chip shows "Auto-Advance ON" (green)

**Fix**: Click the chip to toggle it on

### Verse Not Scrolling?

**Cause**: Browser scroll behavior

**Fix**: Ensure verse cards have unique IDs (automatically added)

---

## 📝 Technical Implementation

### Components Created:

1. **`AudioPlayer.jsx`** - Main audio player component
   - Web Speech API integration
   - Playback controls
   - Voice selection
   - State management

2. **ContentViewer.jsx** - Updated with:
   - Audio player integration
   - Verse tracking state
   - Auto-scroll functionality
   - Visual highlighting

### Features Implemented:

```javascript
// Text-to-Speech Setup
const utterance = new SpeechSynthesisUtterance(text);
utterance.voice = selectedVoice;
utterance.rate = playbackRate;
utterance.volume = volume;
utterance.lang = 'hi-IN' or 'en-US';

// Auto-Advance Logic
utterance.onend = () => {
  if (autoAdvance && hasNext) {
    playNextVerse();
  }
};

// Visual Highlighting
backgroundColor: currentVerse ? '#e3f2fd' : '#fafafa'
border: currentVerse ? '2px solid #2196f3' : 'none'

// Auto-Scroll
element.scrollIntoView({
  behavior: 'smooth',
  block: 'center'
});
```

---

## 🎉 Success!

Your Hanuman Chalisa App now has **professional audio playback** with:

- ✅ Text-to-Speech in Hindi & English
- ✅ Full playback controls
- ✅ Auto-advance between verses
- ✅ Visual highlighting & auto-scroll
- ✅ Adjustable speed & volume
- ✅ Multiple voice options
- ✅ Offline capability
- ✅ No external dependencies

**Try it now**: http://localhost:3000/devotional/hanuman-chalisa

**Press Play and experience devotional audio reading! 🙏🎧**

---

## 📚 Additional Resources

- **Web Speech API**: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis
- **Voice Installation**: Check your OS settings for downloadable voices
- **Browser Support**: https://caniuse.com/speech-synthesis

---

**Happy Listening! May Lord Hanuman's blessings be with you! 🙏**
