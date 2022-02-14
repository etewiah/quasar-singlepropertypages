export default function () {
  // const store = useStore()
  // let dataApiBase = store.getters["configStore/getDataApiBase"]
  function saveLocalPropertyBoard(propertyBoard) {
    let propBoardKey = "prop_board:pwbprem"
    let propBoardUuid = propertyBoard.uuid
    localStorage.setItem(propBoardKey, propBoardUuid)
  }
  return {
    saveLocalPropertyBoard
  }
}