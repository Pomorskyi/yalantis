import React, { useState, useEffect } from 'react'
import EmployeeCard from './EmployeeCard'
import { Col, Spinner } from 'react-bootstrap'
import PropTypes from 'prop-types'

const Empoyees = ({ addFun, delFun, namesProp }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [names, setName] = useState(namesProp)

  useEffect(() => {
    const fetchNames = async () => {
      const sorted = []
      if (namesProp !== undefined) {
        namesProp.map((name) => {
          if (typeof sorted[name.firstName.charAt(0)] == 'object') {
            sorted[name.firstName.charAt(0)].push(name)
          } else {
            sorted[name.firstName.charAt(0)] = [name]
          }
          return 0
        })

        var cols = []
        for (var i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); i++) {
          var employeecards = []
          if (sorted[String.fromCharCode(i)] !== undefined) {
            sorted[String.fromCharCode(i)].sort(function (a, b) {
              if (a.firstName > b.firstName) {
                return 1
              } else if (a.firstName < b.firstName) {
                return -1
              } else return 0
            })

            for (var j = 0; j < sorted[String.fromCharCode(i)].length; j++) {
              employeecards.push(
                <EmployeeCard
                  key={String.fromCharCode(i) + j}
                  employee={sorted[String.fromCharCode(i)][j]}
                  addFun={addFun}
                  delFun={delFun}
                />
              )
            }
          } else {
            employeecards.push(
              <h5 key={String.fromCharCode(i) + j} className='px-3'>
                No Employees
              </h5>
            )
          }
          // console.log(employeecards)
          // employeecards.sort(function (a, b) {
          //   var aFirstName = a.props.employee.firstName
          //   var bFirstName = b.props.employee.firstName

          //   if (aFirstName > bFirstName) {
          //     return 1
          //   } else if (aFirstName < bFirstName) {
          //     return -1
          //   } else return 0
          // })
          // console.log(employeecards)
          cols.push(
            <Col
              key={String.fromCharCode(i)}
              sm={6}
              md={6}
              lg={4}
              xl={3}
              className='my-2'
            >
              <h3 className='px-5'>{String.fromCharCode(i)}</h3>
              {employeecards.map((card) => card)}
            </Col>
          )
        }

        setName(cols)

        setIsLoading(false)
      }
    }
    fetchNames()
  }, [addFun, delFun, namesProp])

  return (
    <div className='EmployeeCardsOuter border border-primary'>
      {isLoading && <Spinner animation='border' />}
      {!isLoading && names}
    </div>
  )
}

EmployeeCard.propTypes = {
  addFun: PropTypes.func.isRequired,
  delFun: PropTypes.func.isRequired,
  namesProp: PropTypes.array,
}

export default Empoyees
