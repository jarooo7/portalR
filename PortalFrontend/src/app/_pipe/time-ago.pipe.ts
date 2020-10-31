import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: string): string {
    let result: string;

    // current time
    const now = new Date().getTime();

    const last = new Date(value);

    // time since message was sent in seconds
    const delta = (now - last.getTime()) / 1000;

    // format string
    if (delta < 10) {
      result = 'teraz';
    } else if (delta < 60) { // sent in last minute
      result =  Math.floor(delta) + ' s. temu';
    } else if (delta < 3600) { // sent in last hour
      result = + Math.floor(delta / 60) + ' min. temu';
    } else if (delta < 86400) { // sent on last day
      result =  Math.floor(delta / 3600) + ' godz. temu';
    } else if (delta >= 86400 && delta < 132800) { // sent more than one day ago
      result = 'wczoraj';
    } else{
      result = Math.floor(delta / 86400) + ' dni';
    }

    return result;
  }

}
