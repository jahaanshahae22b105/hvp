import moment from "moment";

export const ALL = 'all'
export const ONGOING = "ongoing";
export const PAST = "past";
export const UPCOMING = "upcoming";
export const cur_date = moment();

export function get_running_tag(cur, start, end) {
  if (cur > end) return PAST;
  else if (cur < start) return UPCOMING;
  else return ONGOING;
}

export const process_competitionsData = (data) => {
  data = data.map((item) => ({
    ...item,
    start_obj: moment(item.start),
    end_obj: moment(item.end),
    start_formatted: moment(item.start).format(item.start.includes('T')?"MMMM Do YYYY, h:mm":"MMMM Do YYYY"),
    end_formatted: moment(item.end).format(item.end.includes('T')?"MMMM Do YYYY, h:mm":"MMMM Do YYYY"),
    _running_tag: get_running_tag(
      cur_date,
      moment(item.start),
      moment(item.end)
    ),
  }));

  data.sort((a, b) => new Date(a.start) - new Date(b.start));
  return data;

};


