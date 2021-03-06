//
//  Metronome.swift
//  metronome
//
//  Created by Sam Parsons on 1/6/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation
import AudioKit

@objc(Metronome)
class Metronome: NSObject {
  
  // AudioKit objects and data
  var sequencer = AKSequencer()
  var mixer = AKMixer()
  var beep: AKOscillatorBank = AKOscillatorBank.init(waveform: AKTable(.sine), attackDuration: 0.01, decayDuration: 0.05, sustainLevel: 0.1, releaseDuration:  0.05, pitchBend: 0, vibratoDepth: 0, vibratoRate: 0)
  var beepNode: AKMIDINode?
  var callbackInst: AKMIDICallbackInstrument = AKMIDICallbackInstrument()
  
  // data
  var numBeats: Int = 4
  var tempo: Int = 120
  
  // could be useful later
  let minTaps: Int = 3
  var taps: [Double] = []
  
  @objc
  func constantsToExport() -> [AnyHashable: Any]! {
    return ["trackCount": 2]
  }
  
  @objc
  func prepareToPlay() {
    
    beepNode = AKMIDINode(node: beep)
    
    // AudioKit final set up phase
    AudioKit.output = beepNode!
    try! AudioKit.start()
    
    // instantiating metronome and callback tracks and assigning their respective i/o
    _ = sequencer.newTrack()
    sequencer.tracks[0].setMIDIOutput(beepNode!.midiIn)
    _ = sequencer.newTrack()
    sequencer.tracks[1].setMIDIOutput(beepNode!.midiIn)
    _ = sequencer.newTrack()
    sequencer.tracks[2].setMIDIOutput(beepNode!.midiIn)
    _ = sequencer.newTrack()
    sequencer.tracks[3].setMIDIOutput(callbackInst.midiIn)
    
    // sequencer settings initiation
    sequencer.setLength(AKDuration(beats: Double(numBeats)))
    sequencer.enableLooping()
    
    for i in 0..<numBeats {
      if i == 0 {
        sequencer.tracks[0].add(noteNumber: quarterAccentMIDINote, velocity: MIDIVelocity(quarterVolume), position: AKDuration(beats: Double(i)), duration: AKDuration(beats: 0.05))
      } else {
        sequencer.tracks[0].add(noteNumber: quarterMIDINote, velocity: MIDIVelocity(quarterVolume), position: AKDuration(beats: Double(i)), duration: AKDuration(beats: 0.05))
      }
      
      // add eighth notes
      let eighthNotePosition = i + 0.5
      sequencer.tracks[1].add(noteNumber: eighthMIDINote, velocity: MIDIVelocity(eighthVolume), position: AKDuration(beats: eighthNotePosition), duration: AKDuration(beats: 0.05))
      
      // add sixteenth notes
      for j in 0..<2 {
        let tempLocation = i + 0.25 + (0.5 * j)
        sequencer.tracks[2].add(noteNumber: sixteenthMIDINote, velocity: MIDIVelocity(sixteenthVolume), position: AKDuration(beats: tempLocation), duration: AKDuration(beats: 0.05))
      }
    }
  }
  
  @objc
  func pressPlay() {
    print("play button pressed")
    sequencer.play()
  }
  
  @objc
  func pressStop() {
    sequencer.stop()
    print("stop button pressed")
  }
  
  @objc
  func onTempoChange(_ value: Int) {
    print("tempo changed, value: ", value)
    sequencer.setTempo(Double(value))
    tempo = value
  }
  
  @objc
  func onMeterChange(_ value: Int) {
    print("meter slider changed, value: ", value)
    numBeats = value
    
    // clear tracks
    sequencer.tracks[0].clear()
    sequencer.tracks[1].clear()
    sequencer.tracks[2].clear()
    
    // set length and looping
    sequencer.setLength(AKDuration(beats: Double(numBeats)))
    sequencer.enableLooping()
    
    // populate track
    for i in 0..<numBeats {
      if i == 0 {
        sequencer.tracks[0].add(noteNumber: quarterAccentMIDINote, velocity: MIDIVelocity(quarterVolume), position: AKDuration(beats: Double(i)), duration: AKDuration(beats: 0.05))
      } else {
        sequencer.tracks[0].add(noteNumber: quarterMIDINote, velocity: MIDIVelocity(quarterVolume), position: AKDuration(beats: Double(i)), duration: AKDuration(beats: 0.05))
      }
      
      // add eighth notes
      let eighthNotePosition = i + 0.5
      sequencer.tracks[1].add(noteNumber: eighthMIDINote, velocity: MIDIVelocity(eighthVolume), position: AKDuration(beats: eighthNotePosition), duration: AKDuration(beats: 0.05))
      
      // add sixteenth notes
      for j in 0..<2 {
        let tempLocation = i + 0.25 + (0.5 * j)
        sequencer.tracks[2].add(noteNumber: sixteenthMIDINote, velocity: MIDIVelocity(sixteenthVolume), position: AKDuration(beats: tempLocation), duration: AKDuration(beats: 0.05))
      }
    }
  }

  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
