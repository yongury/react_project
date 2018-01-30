import React from 'react';

export default class Filters extends React.Component{
  constructor(props){
    super(props);
  }

  renderListItems (listTypeFilter) {
    return this.props.renderListItemsFilter(listTypeFilter);
  }
  show (listTypeFilter) {
    this.props.showFilter(listTypeFilter);
  }


  render(){

    return <div>
              <div className={"dropdown-container" + (this.props.listVisibleCity ? " show" : "")}>
              <span>City</span>
                  <div className={"dropdown-display" + (this.props.listVisibleCity ? " clicked": "")} onClick={this.show.bind(this,0)} >
                       <span>{this.props.initialFilterData.cityName}</span>
                            <i className="fa fa-angle-down">&#9660;</i>
                  </div>
                  <div className="dropdown-list">
                     <div>
                        {this.renderListItems(0)}
                      </div>
                  </div>
              </div>

              <div className={"dropdown-container" + (this.props.listVisibleMinPrice ? " show" : "")}>
              <span>MinPrice</span>
                  <div className={"dropdown-display" + (this.props.listVisibleMinPrice ? " clicked": "")} onClick={this.show.bind(this,1)} >
                       <span>{this.props.initialFilterData.minPrice}</span>
                            <i className="fa fa-angle-down">&#9660;</i>
                  </div>
                  <div className="dropdown-list">
                     <div>
                      {this.renderListItems(1)}
                      </div>
                  </div>
              </div>

              <div className={"dropdown-container" + (this.props.listVisibleMaxPrice ? " show" : "")}>
              <span>MaxPrice</span>
                  <div className={"dropdown-display" + (this.props.listVisibleMaxPrice ? " clicked": "")} onClick={this.show.bind(this,2)} >
                       <span>{this.props.initialFilterData.maxPrice}</span>
                            <i className="fa fa-angle-down">&#9660;</i>
                  </div>
                  <div className="dropdown-list">
                     <div>
                      {this.renderListItems(2)}
                      </div>
                  </div>
              </div>
              <div className={"dropdown-container show"}>
              <span>Sort by Price</span>
                  <div className={"dropdown-display"}  >
                       <span>Low to High</span>

                  </div>

              </div>

           </div>;
  }
}
Filters.propTypes ={
//                   React.PropTypes.func.isRequired
  listVisibleCity: React.PropTypes.bool.isRequired,
  listVisibleMinPrice: React.PropTypes.bool.isRequired,
  listVisibleMaxPrice: React.PropTypes.bool.isRequired,
  showFilter :React.PropTypes.func.isRequired,
  renderListItemsFilter : React.PropTypes.func.isRequired
}
