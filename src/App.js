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
    console.log(e.target.value)
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
    this.setState({ selectedDay: formatted, selectedElement: number })
  }

  render () {
    if (!this.state.currentDate) return null
    console.log(this.state.currentDate)
    
    const displayDate = this.state.currentDate._d.toString()
    const slicedYear = displayDate.slice(10, 15)
    // const slicedMonth = displayDate.slice(3, 8)
    const fullMonth = moment(displayDate).format('MMMM')

    const daysIntoMonth = parseInt(
      moment(this.state.currentDate)
        .startOf('month')
        .format('d')
    )

    const blankCells = []
    for (let i = 0; i < daysIntoMonth; i++) {
      blankCells.push(
        <td key={i} className='empty'>
          {''}
        </td>
      )
    }

    const dayCells = []
    for (let i = 1; i <= this.state.daysInMonth; i++) {
      if (i === parseInt(moment().format('D'))) {
        dayCells.push(
          <td
            key={i}
            className='cell-with-day today-marker'
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

    const blanksAndCells = [...blankCells, ...dayCells]
    const rows = []
    let cells = []

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
          <div className='outer-border'>
            <div className='row'>
              <div className='current-year-month-wrapper'>

                <div className='column first'>
                  <input
                    type='image'
                    src={previous}
                    alt='back arrow'
                    className='left-side-arrow'
                    onClick={this.handleClickArrow}
                    value='subtract'
                  />
                </div>

                <div className='column2'>
                  <h1 className='current-year-month'>
                    {fullMonth} {slicedYear}
                  </h1>
                </div>

                <div className='column second'>
                  <input
                    type='image'
                    src={next}
                    alt='next arrow'
                    className='right-side-arrow'
                    onClick={this.handleClickArrow}
                    value='add'
                  />
                </div>

              </div>
            </div>

            <table className='weeks-wrapper'>
              <tbody>
                <tr className='weeks-header-wrapper'>
                  {moment.weekdaysMin(true).map(day => (
                    <th key={day} className='weeks'>
                      {day}
                    </th>
                  ))}
                </tr>
              </tbody>
              <tbody>{dayCells2}</tbody>
            </table>
          </div>
        </div>
      </>
    )
  }
}

export default App
