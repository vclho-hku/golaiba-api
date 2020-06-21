export default {
  Query: {
    users: (parent, args, { models }) => {
      return [{"a": "b"}, {"c": "d"}]
    },
    user: (parent, { id }, { models }) => {
      return {_id: "888"}
    },
  },
};