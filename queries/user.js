import {GraphQLSchema, GraphQLObjectType, GraphQLInt, GraphQLNonNull, GraphQLString, GraphQLList} from 'graphql';
import co from 'co';
import User from '../schema/user';

function getProjection(fieldASTs) {
  return fieldASTs.selectionSet.selections.reduce((projections, selection) => {
    projections[selection.name.value] = 1;
    return projections;
  }, {});
}

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'User Creator',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'User ID'
    },
    userName: {
      type: GraphQLString,
      description: 'User Name'
    },
    repos: {
      type: new GraphQLList(UserType),
      description: 'Repos owned by user, or empty list if none',
      resolve: (user, params, source, fieldASTs) => {
        let projections = getProjection(fieldASTs);
        return User.find({
          _id: {
            $in: user.repos.map((id) => id.toString())
          }
        }, projections);
      }
    }
  })
});

const Schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      hello: {
        type: GraphQLString,
        resolve: () => 'World'
      },
      user: {
        type: UserType,
        args: {
          id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: (root, {id}, source, fieldASTs) => {
          let projections =  getProjection(fieldASTs);
          return User.findById(id, projections);
        }
      }
    }
  })
});

export default Schema;
