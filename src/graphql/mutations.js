/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $input: CreateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    createTodo(input: $input, condition: $condition) {
      id
      name
      description
      location
      createdAt
      updatedAt
    }
  }
`;
// export const updateTodo = /* GraphQL */ `
//   mutation UpdateTodo(
//     $input: UpdateTodoInput!
//     $condition: ModelTodoConditionInput
//   ) {
//     updateTodo(input: $input, condition: $condition) {
//       id
//       name
//       description
//       location
//       createdAt
//       updatedAt
//     }
//   }
// `;
// export const deleteTodo = /* GraphQL */ `
//   mutation DeleteTodo(
//     $input: DeleteTodoInput!
//     $condition: ModelTodoConditionInput
//   ) {
//     deleteTodo(input: $input, condition: $condition) {
//       id
//       name
//       description
//       location
//       createdAt
//       updatedAt
//     }
//   }
// `;

export const deleteTodo = `
  mutation deleteTodo($id: ID!){
    deleteTodo(input:{id: $id}){
      id
      name
      description
      location
      createdAt
      updatedAt
    }
  }
`
export const updateTodo = `
  mutation updateTodo($id: ID!,$name:String, $description: String!, $location: String){
    updateTodo(input:{id: $id, name:$name, description:$description, location:$location}){
      id
      name
      description
      location
    }
  }
`
