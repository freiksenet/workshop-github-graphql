import React, { Component } from 'react';

export default class Issues extends Component {
  render() {
    return (
      <div style={{ marginTop: 20 }}>
        Issues (total: {this.props.issues.totalCount}):
        <div>
          {this.props.issues.nodes.map((issue, index) => (
            <div
              key={index}
              style={{ padding: 5, borderTop: '1px solid black' }}
            >
              <div>{issue.author.login}</div>
              <div>{issue.body}</div>
              <div>{issue.createdAt}</div>
            </div>
          ))}
        </div>
        {this.props.issues.pageInfo.hasNextPage && (
          <button onClick={this.props.loadMore}>Load more!</button>
        )}
      </div>
    );
  }
}
