import * as moment from 'moment';

const dateFormat: string = String('dddd, Do MMMM YYYY (h:mm:ss)').toString();

export const formatDate: any = (date?: Date) => {
  return moment(date).format(dateFormat);
};
