// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

public final class FindMeetingQuery {
  public Collection<TimeRange> query(Collection<Event> events, MeetingRequest request) {
    List<TimeRange> availableTimes = new ArrayList<TimeRange>();
    if (request.getAttendees().isEmpty()) {
        availableTimes.add(TimeRange.WHOLE_DAY);  
        return availableTimes;  
    } else if (request.getDuration() > TimeRange.WHOLE_DAY.duration()) {
      return availableTimes;
    } else {
      return getAvailableTimeRanges(availableTimes, events, request);
    }
  }

  public Collection<TimeRange> getAvailableTimeRanges(Collection<TimeRange> availableTimes, Collection<Event> events,
      MeetingRequest request) {
    List<TimeRange> eventTimes = new ArrayList<TimeRange>();
    int prevTime = TimeRange.START_OF_DAY;

    for (Event e: events){
     eventTimes.add(e.getWhen());
    }
    Collections.sort(eventTimes, TimeRange.ORDER_BY_START);

    for(int i = 0; i < eventTimes.size(); i++){
        if(eventTimes.get(i).start() - request.getDuration() >= prevTime ){
            TimeRange t = TimeRange.fromStartEnd(prevTime, eventTimes.get(i).start(), false);
            availableTimes.add(t);
        }
        if (i+1 == eventTimes.size() && eventTimes.get(i).end() < TimeRange.END_OF_DAY){
            TimeRange t = TimeRange.fromStartEnd(eventTimes.get(i).end(), TimeRange.END_OF_DAY, true);
            availableTimes.add(t);
        }
        prevTime = eventTimes.get(i).end();
    }
    
    return availableTimes;
  }
}
