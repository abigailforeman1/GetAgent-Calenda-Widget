import React from 'react'
import moment from 'moment'
// importing this package to close calendar when user clicks away from element
import ClickOutHandler from 'react-onclickout'
//importing Calendar 
import Calendar from './components/Calendar'
// importing images
import arrows from './assets/Up-down.svg'

class App extends React.Component {
  state = {
    currentDate: '',
    daysInMonth: null,
    months: moment.months(),
    daysArray: [],
    selectedDateMomentFormat: '',
    formPlaceholder: 'Please select',
    showCalendar: false
  }

  componentDidMount () {
    const currentDate = moment.utc()
    const daysInMonth = parseInt(moment(currentDate).daysInMonth())
    // creating an array of the days in current month
    const daysArray = []
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i)
    }
    this.setState({ currentDate, daysInMonth, daysArray })
  }

  // looping through days in current displayed month to create an array of all days
  createDaysArray (daysInMonth) {
    const daysArray = []
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i)
    }
    this.setState({ daysArray })
  }

  // uses prop sent to function to determine whether adding or subtracting a month, sets new month and days in month to state
  handleClickArrow = e => {
    const newMonth =
      e.target.value === 'add'
        ? this.state.currentDate.add(1, 'month')
        : this.state.currentDate.subtract(1, 'month')
    const daysInMonth = parseInt(moment(newMonth).daysInMonth())
    this.createDaysArray(daysInMonth)
    this.setState({ currentDate: newMonth, daysInMonth: daysInMonth })
  }

  // creating correct date format from the event target when clicking on a cell
  selectDay = e => {
    const number = parseInt(e.target.innerHTML)
    const event = e.target.innerHTML
    const formatted = `${event}/${moment(this.state.currentDate).format(
      'MM/YYYY'
    )}`
    this.setState({
      selectedDay: formatted,
      selectedElement: number,
      formPlaceholder: formatted,
      showCalendar: false
    })
  }

  // opening calendar modal
  handleShowCalendar = () => {
    this.setState({ showCalendar: true })
  }

  // closing calendar modal
  onClickOut = () => {
    this.setState({ showCalendar: false })
  }

  render () {
    if (!this.state.currentDate) return null

    //taking current date and creating a string to display at top of calendar
    const displayDate = this.state.currentDate._d.toString()
    const slicedYear = displayDate.slice(10, 15)
    const fullMonth = moment(displayDate).format('MMMM')

    // finding what day of the week the current month starts on (in numbers)
    const daysIntoMonth = parseInt(
      moment(this.state.currentDate)
        .startOf('month')
        .format('d')
    )

    // creating an array of 'table data' elements for the 'blank' days before the month starts
    const blankCells = []
    for (let i = 0; i < daysIntoMonth; i++) {
      blankCells.push(
        <td key={i} className='empty'>
          {''}
        </td>
      )
    }

    // creating an array of 'table data' elements for all the days of the month -- also checking for the current day and adding an extra classname
    const dayCells = []
    for (let i = 1; i <= this.state.daysInMonth; i++) {
      if (i === parseInt(moment().format('D'))) {
        dayCells.push(
          <td
            key={i}
            className={
              this.state.selectedElement === i
                ? 'selected-day cell-with-day'
                : 'cell-with-day'
            }
            id='today-marker'
            onClick={this.selectDay}
          >
            {i}
          </td>
        )
      } else {
        dayCells.push(
          <td
            key={i}
            className={
              this.state.selectedElement === i
                ? 'selected-day cell-with-day'
                : 'cell-with-day'
            }
            onClick={this.selectDay}
          >
            {i}
          </td>
        )
      }
    }

    // spreading the blank cells and the day cells into 1 big array ready to create the calendar
    const blanksAndCells = [...blankCells, ...dayCells]
    const rows = []
    let cells = []

    // looping through the array and creating rows of 7 cells then pushing this into the rows array
    blanksAndCells.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row)
      } else {
        rows.push(cells)
        cells = []
        cells.push(row)
      }
      if (i === blanksAndCells.length - 1) {
        rows.push(cells)
      }
    })

    // creating html 'table row' elements for each row
    const dayCells2 = rows.map(row => {
      return (
        <tr key={Math.random()} className='day-cells'>
          {row}
        </tr>
      )
    })

    return (
      <>
        <div className='main-wrapper'>
          <div className='main-input-wrapper'>
            <div className='text-wrapper'>
              <h1 className='main-header'>
                Have you sold subject to contract?
              </h1>
              <p className='subheader'>
                Enter your exchange date to unlock the tools you need for the
                next stage of your sale.
              </p>
            </div>

            <div className='select-submit-wrapper'>
              <div className='selection-box' onClick={this.handleShowCalendar}>
                <p className='placeholder'>{this.state.formPlaceholder}</p>

                <div className='up-down-arrow-wrapper'>
                  <input
                    className='up-down-arrow'
                    type='image'
                    src={arrows}
                    alt='up down arrors'
                  />
                </div>
              </div>

              <button className='submit-button'>Submit</button>

              <div className='extra-div'>
                {this.state.showCalendar && (
                  <ClickOutHandler onClickOut={this.onClickOut}>
                    <Calendar
                      handleClickArrow={this.handleClickArrow}
                      fullMonth={fullMonth}
                      slicedYear={slicedYear}
                      dayCells2={dayCells2}
                    />
                  </ClickOutHandler>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default App
