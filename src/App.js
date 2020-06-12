import React from 'react'
import moment from 'moment'

class App extends React.Component {
  state = {
    currentDate: '',
    daysInMonth: null,
    months: moment.months()
  }

  componentDidMount () {
    const currentDate = moment()
    const daysInMonth = parseInt(moment(currentDate).daysInMonth())
    this.setState({ currentDate, daysInMonth })
  }

  render () {
    if (!this.state.currentDate) return null

    console.log(this.state.selectedDay)

    const displayDate = this.state.currentDate._d.toString()
    const slicedYear = displayDate.slice(10, 15)
    const slicedMonth = displayDate.slice(3, 8)

    return (
      <>
        <div className='main-wrapper'>
          <div className='outer-border '>
            <div className='row'>
              <div className='current-year-month-wrapper'>
                <div className='column'>
                  <h1 className='current-year-month'>
                    {slicedMonth} {slicedYear}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default App
