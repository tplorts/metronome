//
//  Metronome.m
//  metronome
//
//  Created by Sam Parsons on 1/6/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(Metronome, NSObject)
RCT_EXTERN_METHOD(pressPlay)
RCT_EXTERN_METHOD(pressStop)
RCT_EXTERN_METHOD(onTempoChange:(NSInteger *) value)
RCT_EXTERN_METHOD(prepareToPlay)
RCT_EXTERN_METHOD(onMeterChange:(NSInteger *) value)
RCT_EXTERN_METHOD(onEighthNoteVolumeChange:(NSInteger *) value)
@end
