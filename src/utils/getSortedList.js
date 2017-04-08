import firstBy from 'thenby';

export default (sortBy: string = 'state', schoolArray: Array) => {
  // Update sorted list based on sorted prop
  const schoolList = schoolArray.slice();
  // Requires two sorts because states have many schools
  if (sortBy === 'state') {
    schoolList.sort(firstBy('state', {ignoreCase: true}).thenBy('name', {ignoreCase: true}));
  } else {
    schoolList.sort(firstBy(sortBy, {ignoreCase: true}));
  }

  const listWithLabels = [];
  schoolList.forEach((school, i, list) => {
    if (
      (sortBy === 'state') &&
      (i === 0 || list[i][sortBy].toLowerCase() !== list[i-1][sortBy].toLowerCase())
    ) {
      listWithLabels.push({title: school[sortBy], isLabel: true});
    // Else if alphabetical sort
    // (numerical sort will not have dividers for now)
    } else if (
      (sortBy === 'name' || sortBy === 'accredidation') &&
      (i === 0 || list[i][sortBy][0].toLowerCase() !== list[i-1][sortBy][0].toLowerCase())
    ) {
      listWithLabels.push({title: school[sortBy][0], isLabel: true });
    }
    listWithLabels.push(school);
  });
  return listWithLabels;  
}
