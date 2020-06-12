import React from 'react'
import moment from 'moment'

import previous from './assets/Previous.svg'
import next from './assets/Next.svg'

class App extends React.Component {
  state = {
    currentDate: '',
    daysInMonth: null,
    months: moment.months(),
    daysArray: [],
    selectedDateMomentFormat: ''
  }

  componentDidMount () {
    const currentDate = moment()
    const daysInMonth = parseInt(moment(currentDate).daysInMonth())
    const daysArray = []
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i)
    }
    this.setState({ currentDate, daysInMonth, daysArray })
  }

  createDaysArray (daysInMonth) {
    const daysArray = []
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i)
    }
    this.setState({ daysArray })
  }

  handleClickArrow = e => {
    console.log(e.target.value)
    const newMonth =
      e.target.value === 'add'
        ? this.state.currentDate.add(1, 'month')
        : this.state.currentDate.subtract(1, 'month')
    const daysInMonth = parseInt(moment(newMonth).daysInMonth())
    this.createDaysArray(daysInMonth)
    this.setState({ currentDate: newMonth, daysInMonth: daysInMonth })
  }

  // handleClickBack = () => {
  //   const newMonth = this.state.currentDate.subtract(1, 'month')
  //   const daysInMonth = parseInt(moment(newMonth).daysInMonth())
  //   this.createDaysArray(daysInMonth)
  //   this.setState({ currentDate: newMonth, daysInMonth: daysInMonth })
  // }

  // handleClickForward = () => {
  //   const newMonth = this.state.currentDate.add(1, 'month')
  //   const daysInMonth = parseInt(moment(newMonth).daysInMonth())
  //   this.createDaysArray(daysInMonth)
  //   this.setState({ currentDate: newMonth, daysInMonth: daysInMonth })
  // }

  render () {
    if (!this.state.currentDate) return null

    const displayDate = this.state.currentDate._d.toString()
    const slicedYear = displayDate.slice(10, 15)
    const slicedMonth = displayDate.slice(3, 8)

    return (
      <>
        <div className='main-wrapper'>
          <div className='outer-border '>
            <div className='row'>
              <div className='current-year-month-wrapper'>
                <button
                  className='left-side-arrow column back-arrow'
                  onClick={this.handleClickArrow}
                  value='subtract'
                >
                  <img
                    className='back-arrow'
                    src={previous}
                    alt='back arrow'
                    value='subtract'
                  />
                </button>

                <div className='column'>
                  <h1 className='current-year-month'>
                    {slicedMonth} {slicedYear}
                  </h1>
                </div>
                <button
                  className='right-side-arrow column'
                  onClick={this.handleClickArrow}
                  value='add'
                >
                  <img
                    className='next-arrow'
                    src={next}
                    alt='next arrow'
                    value='add'
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default App
