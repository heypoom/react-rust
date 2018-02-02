// 1. ชื่อของ Action: เราอยากทำอะไร [Action Name]
export const ADD_TODO = 'ADD_TODO'
export const DELETE_TODO = 'DELETE_TODO'

// 2. ฟังก์ชั่นที่เอาไว้ใช้สร้าง Action [Action Creator]
export const addTodo = todo => ({
  type: ADD_TODO,
  payload: todo,
})

export const deleteTodo = name => ({
  type: DELETE_TODO,
  payload: name,
})

// 3. ข้อมูลทั้งหมดที่อยู่ในแอพ: State
const initialState = {
  todos: [],
}

// 4. Reducer: ฟังก์ชั่นที่เอาไว้ใช้เปลี่ยนแปลงข้อมูล
export default function todoReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      }
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo !== action.payload),
      }
    default:
      return state
  }
}
