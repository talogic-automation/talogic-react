import { timelineBox, timelineTicks } from './timeline.algorithm'

describe('timelineBox', () => {
  it('places a span in percent of the timeline', () => {
    expect(timelineBox(60, 180, 600)).toEqual({ left: 10, width: 20 })
  })

  it('clips a span that runs past the end', () => {
    expect(timelineBox(540, 900, 600)).toEqual({ left: 90, width: 10 })
  })

  it('places nothing on an empty timeline', () => {
    expect(timelineBox(0, 10, 0)).toEqual({ left: 0, width: 0 })
  })
})

describe('timelineTicks', () => {
  it('spaces ticks evenly from zero to the end', () => {
    expect(timelineTicks(840, 8)).toEqual([0, 120, 240, 360, 480, 600, 720, 840])
  })

  it('always gives both ends', () => {
    expect(timelineTicks(90, 1)).toEqual([0, 90])
  })
})
