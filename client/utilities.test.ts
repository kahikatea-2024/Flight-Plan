import { test, expect, describe, it } from 'vitest'
import { formatDateYMD, formatTimeToHHHH } from './utilities'
//TESTS
test('given 10-07-2024 it should return 2024-07-10'),
  () => {
    //arrange
    const expected = '2024-07-10'
    //act
    const actual = formatDateYMD('10-07-2024')
    //assert
    expect(actual).toBe(expected)
  }

describe('given a time it should return a 24hr format time', () => {
  it('returns correct format', () => {
    //arrange
    const expected = '08:00'
    //act
    const actual = formatTimeToHHHH('08:00am')
    //assert
    expect(actual).toBe(expected)
  })
  it('returns correct format', () => {
    //arrange
    const expected = '02:30'
    //act
    const actual = formatTimeToHHHH('02:30am')
    //assert
    expect(actual).toBe(expected)
  })
  it('returns correct format', () => {
    //arrange
    const expected = '14:00'
    //act
    const actual = formatTimeToHHHH('02:00pm')
    //assert
    expect(actual).toBe(expected)
  })
  it('returns correct format', () => {
    //arrange
    const expected = 'error'
    //act
    const actual = formatTimeToHHHH('01:00mm')
    //assert
    expect(actual).toBe(expected)
  })
  it('returns correct format', () => {
    //arrange
    const expected = 'error'
    //act
    const actual = formatTimeToHHHH('25:00pm')
    //assert
    expect(actual).toBe(expected)
  })
})

describe('given a time and date it should return the correct iso format', () => {
  it('returns correct format', () => {
    //arrange
    const expected = '2024-06-21T10:00:00Z'
    //act
    const actual = formatDateYMD('21-06-2024') + formatTimeToHHHH('10:00am')
    //assert
    expect(actual).toBe(expected)
  })
  it('returns correct format', () => {
    //arrange
    const expected = '0800'
    //act
    const actual = formatTimeToHHHH('08:00am')
    //assert
    expect(actual).toBe(expected)
  })
  it('returns correct format', () => {
    //arrange
    const expected = '0800'
    //act
    const actual = formatTimeToHHHH('08:00am')
    //assert
    expect(actual).toBe(expected)
  })
})
