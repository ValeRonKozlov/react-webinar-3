export const generateListComments = (initialCommentList, id) => {
  let resultList = [];

  initialCommentList.forEach(item => {
    if (item.parent._id === id) {
      resultList.push([{...item}])
    }
  })

  const changeList = (comment) => {
    resultList.forEach((item, i)=> {
      item.forEach(item2 => {
        if (item2._id === comment.parent._id) {
          resultList[i].push({...comment})
        }
      })
    })
  }
  initialCommentList.forEach(item => changeList(item))

  return resultList;
}