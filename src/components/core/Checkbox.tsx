import { Typography, List, Checkbox as AntdCheckbox } from 'antd'
import { CheckboxValueType } from 'antd/lib/checkbox/Group'
import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategory } from '../../store/actions/category.actions'
import { AppState } from '../../store/reducers'
import { CategoryState } from '../../store/reducers/category.reducer'

const { Title } = Typography

interface Props {
  handleFilters: (args: string[]) => void
}

const Checkbox: FC<Props> = ({handleFilters}) => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCategory())
  }, [])

  const category = useSelector<AppState, CategoryState>(state => state.category)

  const onChange = (checkedValue: CheckboxValueType[]) => {
    handleFilters(checkedValue as string[])
  }

  return (
    <>
      <Title level={4}>按照分类筛选</Title>
      <AntdCheckbox.Group
        className="checkBoxFilter"
        options={category.category.result.map(item => ({label: item.name, value: item._id}))}
        onChange={onChange}
      />
    </>
  )
}

export default Checkbox
