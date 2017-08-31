'use strict';

import React, { PropTypes } from 'react';

export class VirtualScroll extends React.Component {

  static get propTypes() {
    return {
      scrollContainerHeight: PropTypes.number,
      totalNumberOfRows: PropTypes.number,
      rows: PropTypes.array,
      rowHeight: PropTypes.number, // assumes to remain fixed
      rowRenderer: PropTypes.func // syntax - rowRenderer(rowStyles, fromRow, toRow, parentStyles)
    };
  }

  constructor() {
    super();
    this.state = {
      contentHeight: 0,
      startRowsFrom: 0,
      endRowsTo: 0,
      rowsThatCanBeShownInVisibleArea: 0,
      alreadyScrolledRows: 0
    };
    this.didntRanSince = Date.now();
    this.forceRerenderAtleastIn = 10;
    Object.assign({}, this.state);
    this.lastRenderedState = Object.assign({}, this.state);
  }

  componentWillMount() {
    this.updateContent(this.state.scrollPos || 0);
  }

  componentWillReceiveProps(newProps) {
    this.updateContent(this.state.scrollPos || 0, newProps);
  }

  render() {
    const { totalNumberOfRows, scrollContainerHeight, rowHeight } = this.props;
    const totalRowHeight = totalNumberOfRows * rowHeight;
    const activateVirtualScroll = totalRowHeight > scrollContainerHeight;

    // Finding out maximum height of the container-
    let virtualScrollHeight = (scrollContainerHeight > window.innerHeight) ? window.innerHeight : scrollContainerHeight;
    virtualScrollHeight = totalRowHeight < virtualScrollHeight ? totalRowHeight : virtualScrollHeight;

    return (
      <div className='virtualScrollContainer'
        style={{ height: `${virtualScrollHeight}px` }}>
        {
          activateVirtualScroll ?
          this.props.rowRenderer(
            { transform: `translateY(${this.state.startRowsFrom * this.props.rowHeight}px)`, height: `${rowHeight}px` },
            this.state.startRowsFrom,
            this.state.endRowsTo,
            { height: `${totalRowHeight}px` }
          ) :
          this.props.rowRenderer(
            { transform: 'translateY(0px)', height: `${rowHeight}px` },
            0,
            totalNumberOfRows,
            { height: `${totalRowHeight}px` }
          )
        }
      </div>
    );
  }

  updateContent(yPos, newProps) {
    const props = newProps || this.props;
    this.didntRanSince = Date.now();
    const virtualScrollContainerHeight = props.scrollContainerHeight > window.innerHeight ? window.innerHeight : props.scrollContainerHeight;
    const totalRowsToDisplay = props.totalNumberOfRows;
    const contentHeight = props.totalNumberOfRows * props.rowHeight;
    const alreadyScrolledRows = parseInt(yPos / props.rowHeight, 10);
    const rowsThatCanBeShownInVisibleArea = Math.ceil(virtualScrollContainerHeight / props.rowHeight);
    const startRowsFrom = parseInt(Math.max(0, alreadyScrolledRows), 10);
    const endRowsTo = alreadyScrolledRows + rowsThatCanBeShownInVisibleArea;

    this.setState({
      contentHeight: contentHeight,
      startRowsFrom,
      endRowsTo: endRowsTo,
      rowsThatCanBeShownInVisibleArea,
      totalRowsToDisplay,
      alreadyScrolledRows,
      scrollPos: yPos,
      rows: this.props.rows
    });
  }

  scrollHook($el) {
    this.updateContent($el.scrollTop);
  }

}
