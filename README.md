# react-virtual-scrolling

This react component allows you to use virtualization for a very long list of data.

It provides smooth performance experience while scrolling the list.

# Why Virtual Scrolling

Reason why this component is created:

Problem Statement - 

have you ever come across a situation where you have a large list of data and 10000 or 20000 rows need to be rendered on DOM. DOM can't handle such a large data and performance while scrolling or loading the screen gets a serious hit. Sometimes, DOM also breakdown.

Solution -

We should render only the rows that are visible in the viewport, all others should get rendered only when they come into visibility.
Otherwise they should not get rendered at all.
This keeps our DOM light and have only necessary information.

Benefits -

Thus, for the above solution, react-virtual-scrolling is created. It's key benefits are-

- Fast performance ( if earlier, list rendering was taking 6s, now it takes some milliseconds only ).
- Better control on DOM
- Any number of rows can be rendered, no limit on the number of rows that can be rendered.

## Installation

To install this Component, run `yarn add react-virtual-scrolling` or `react-virtual-scrolling`.


## Usage

To use the component, In your react Application just do

```javascript

render() {
    return (
        <div ref="list" onScroll={this.scrollList}>
            <VirtualScroll
                {...this.props}
                ref="virtualScroll"
                rows={this.data}
                scrollContainerHeight={400} // height of the container that would remain visible
                totalNumberOfRows={(this.data.length) || 0}
                rowHeight={25} // for now, only fixed height rows can be rendered in the component
                rowRenderer={this.contentRenderer.bind(this)} // function for rendering different type of lists 
            />
        </div> 
    );
  }


  renderRows(fromRow, toRow, styles) {
    const generatedRows = [];
    for (let i = fromRow; i < toRow; i++) {
      generatedRows.push(<li style={styles}>{ 'List item' + (i+1) }</li>);
    }
    return generatedRows;
  }

  scrollList(e) {
    if (this.refs.virtualScroll) {
      this.refs.virtualScroll.scrollHook(e.target);
    }
  }

  contentRenderer(rowStyles, fromRow, toRow, parentStyles) {
    return (
      <ul style={parentStyles}> // complete control on list styling 
        {this.renderRows(fromRow, toRow, rowStyles)}
      </ul>
    );
  }


```

## Demo 

Please find the working example of the above component here https://kritika2808.github.io/virtual-scroll/#/list

## Restriction 

Only fixed height rows can be rendered in the component.

## Upcoming versions

Buffering/caching will be included in upcoming versions

