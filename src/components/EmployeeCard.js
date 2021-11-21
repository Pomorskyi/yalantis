import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'react-bootstrap'

const selectedName = {
  color: 'blue',
}

const EmployeeCard = ({ employee, addFun, delFun }) => {
  var styleName
  if (employee.isNeeded) styleName = selectedName

  return (
    <Card className='my-3 p-1 cardWithoutBorder employeeCard'>
      <Card.Body>
        <h5 style={styleName}>
          {employee.firstName + ' ' + employee.lastName}
        </h5>
        <div>
          <div className='emplCardRadioInline'>
            <input
              onChange={delFun}
              checked={!employee.isNeeded}
              type='radio'
              value='not active'
              name={employee.id}
            />{' '}
            not active
          </div>
          <div className='emplCardRadioInline'>
            <input
              checked={employee.isNeeded}
              onChange={addFun}
              type='radio'
              value='active'
              name={employee.id}
            />{' '}
            active
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}

EmployeeCard.propTypes = {
  props: PropTypes.object.isRequired,
  addFun: PropTypes.func.isRequired,
  delFun: PropTypes.func.isRequired,
}

export default EmployeeCard
