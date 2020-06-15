import React from 'react'
import moment from 'moment'
// importing images
import previous from '../assets/Previous.svg'
import next from '../assets/Next.svg'

const Calendar = ({ handleClickArrow, fullMonth, slicedYear, dayCells2 }) => (
  <div className='entire-calendar'>
    <div className='row'>
      <div className='current-year-month-wrapper'>
        <div className='column-first'>
          <input
            type='image'
            src={previous}
            alt='back arrow'
            className='left-side-arrow'
            onClick={handleClickArrow}
            value='subtract'
          />
        </div>

        <div className='column-middle'>
          <h1 className='current-year-month'>
            {fullMonth} {slicedYear}
          </h1>
        </div>

        <div className='column-second'>
          <input
            type='image'
            src={next}
            alt='next arrow'
            className='right-side-arrow'
            onClick={handleClickArrow}
            value='add'
          />
        </div>
      </div>
    </div>

    <table>
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
)

export default Calendar
