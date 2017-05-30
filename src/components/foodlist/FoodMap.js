import React from 'react'
import axios from 'axios'
import localforage from 'localforage'

class FoodMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchForm: '',
      results: []
    };
    this.handleSearchFormOnChange = this.handleSearchFormOnChange.bind(this)
    this.sendSearchVal = this.sendSearchVal.bind(this)
  }

  componentDidMount() {
    this.sendSearchVal()
  }

  sendSearchVal() {
    const searchVal = this.state.searchForm
    localforage.getItem('appName')
    .then((authInfo) => {
      return axios({
        method: 'GET',
        url: 'http://localhost:3000/foods/search',
        headers: JSON.parse(authInfo),
        params: { location: searchVal }
      })
    }).then((response) => {
      this.setState({
        searchForm: '',
        results: response.data.results
      })
    })
  }

  handleSearchFormOnChange (e) {
    console.log(e.target.value)
    this.setState({ searchForm: e.target.value })
  }

  render() {
    const sendSearchVal = this.sendSearchVal
    return (
      <div>
        <h2>hello some fancy google maps shit</h2>
        <form onSubmit={(event) => {
          event.preventDefault()
          sendSearchVal()
        }}>
          <input type='text' value={this.state.searchForm} onChange={this.handleSearchFormOnChange} placeholder='Location' />
          <button>Submit</button>
        </form>

        <div className="search-results">
          {
            this.state.results.map((item) => {
                return (
                    <p>
                    NAME: {item.name} <br />
                    ADDRESS: {item.formatted_address} <br />
                    RATING: {item.rating}
                  </p>
                )
            })
          }
        </div>
      </div>
    );
  }

}

export default FoodMap;
