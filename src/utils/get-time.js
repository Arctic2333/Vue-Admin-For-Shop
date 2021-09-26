export function getTime(){
  let date1 = new Date();
  let year = date1.getFullYear();
  let month = date1.getMonth() + 1;
  let day = date1.getDate();
  let hours = date1.getHours();
  let minutes = date1.getMinutes();
  let seconds = date1.getSeconds();
  return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds
}
