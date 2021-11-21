import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const MONTHES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'Octoder',
  'November',
  'December',
]

const EmpoyeesBirthday = ({ employees }) => {
  const [selected, setSelected] = useState([])

  useEffect(() => {
    const fetchSelected = async () => {
      var usedMonthes = []

      var newArr = []
      employees
        .filter((employee) => employee.isNeeded)
        .forEach((employee) => {
          newArr.push(employee)
        })

      MONTHES.forEach((month) =>
        usedMonthes.push(
          <div key={month}>
            <h4 key={month + '_h4'}>{month.toUpperCase()}</h4>
            {newArr.filter(
              (employee) =>
                MONTHES[parseInt(employee.dob.split('-')[1]) - 1] === month
            ).length > 0 && (
              <ul key={month + '_ul'}>
                {newArr
                  .filter(
                    (employee) =>
                      MONTHES[parseInt(employee.dob.split('-')[1]) - 1] ===
                      month
                  )
                  .sort(function (a, b) {
                    if (a.lastName > b.lastName) {
                      return 1
                    } else if (a.lastName < b.lastName) {
                      return -1
                    } else return 0
                  })
                  .map((employee) => {
                    return (
                      <li key={month + '_ul_' + employee.id}>
                        {employee.firstName +
                          ' ' +
                          employee.lastName +
                          ' ' +
                          employee.dob.split('-')[2].substr(0, 2) +
                          ' ' +
                          MONTHES[parseInt(employee.dob.split('-')[1]) - 1] +
                          ', ' +
                          employee.dob.split('-')[0] +
                          ' year'}
                      </li>
                    )
                  })}
              </ul>
            )}
            {newArr.filter(
              (employee) =>
                MONTHES[parseInt(employee.dob.split('-')[1]) - 1] === month
            ).length === 0 && (
              <h6 className='mx-3' key={month + '_noEmployee'}>
                No Employees
              </h6>
            )}
          </div>
        )
      )

      if (newArr.length === 0) {
        usedMonthes = [
          <h5 key={'employeesListIsEmpty'}>Employees List is empty</h5>,
        ]
      }

      var d = new Date()
      var curMonthNumber = 0
      for (var i = 0; i < MONTHES.length; i++) {
        if (
          ('' + d).split(' ')[1].toUpperCase() ===
          MONTHES[i].substr(0, 3).toUpperCase()
        ) {
          curMonthNumber = i
        }
      }

      for (var k = 0; k < curMonthNumber; k++) {
        usedMonthes.push(usedMonthes.shift())
      }

      setSelected(usedMonthes)
    }

    fetchSelected()
  }, [employees])

  return <div key='monthes'>{selected.map((select) => select)}</div>
}

EmpoyeesBirthday.propTypes = {
  employees: PropTypes.array.isRequired,
}

export default EmpoyeesBirthday
