// const array = [
//   {
//     date: "17-05-23",
//   },
//   {
//     date: "15-05-23",
//   },
//   {
//     date: "15-06-23",
//   },
//   {
//     date: "17-07-23",
//   },
//   {
//     date: "18-04-23",
//   },
//   {
//     date: "21-05-23",
//   },
// ];

// export const SortDates = () => {
//   const newArray: any = [];
//   array.map((index: any, i: number) => {
//     if (newArray.length === 0) {
//       newArray.push(index);
//     } else {
//       let find: number = 0;
//       newArray.map((item: any, j: number) => {
//         if (item === index) {
//           item = index;
//           newArray.push(index);
//           find = 1;
//         }
//       });
//       if (find !== 1) {
//         newArray.push(index);
//       }
//     }
//   });
//   ;
// };

export function sortByDate(array: any[]) {
  array.sort((a, b) => {
    const datePartsA = a.date.split("-").map((part: any) => parseInt(part));
    const datePartsB = b.date.split("-").map((part: any) => parseInt(part));
    const [dayA, monthA, yearA] = datePartsA;
    const [dayB, monthB, yearB] = datePartsB;

    if (yearA !== yearB) {
      return yearA - yearB;
    }
    if (monthA !== monthB) {
      return monthA - monthB;
    }
    return dayA - dayB;
  });
  return array;
}

// sortByDate(array);
// ;
