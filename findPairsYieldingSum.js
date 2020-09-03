/* 
takes array of integers and target sum (10 by default) and outputs
all possible pairs of complements, unique pairs and their matches under communitive property,
and unique pairs without their communitive matches

solution based on these observations:
  - complements exist where targetSum = n + m
  - for complements where n != m:
      total pairs = 2(Dn * Dm), where Dn and Dm represent the number of occurrences of those integers
  - for complements where n == m (ex. [5,5])
      total pairs = Dn(Dn - 1)
*/
const findPairsYieldingSum = (nums, targetSum = 10) => {
  if (!Array.isArray(nums) || nums.length <= 1) return undefined

  const uniqueNums = new Set(nums)
  const pairTracker = new Map()

  const evenHalves = JSON.stringify([targetSum/2, targetSum/2])

  for (let i = nums.length - 1; i >= 0; i--) {
    let complement = targetSum - nums[i]
    let complementPair = JSON.stringify([nums[i], complement])

    if (pairTracker.has(complementPair)) {
      pairTracker.set(complementPair, pairTracker.get(complementPair) + 1)
    } else if (uniqueNums.has(complement)) {
      pairTracker.set(complementPair, 1)
    } 
  }

  if (pairTracker.has(evenHalves)) {
    const copiesOfHalf = pairTracker.get(evenHalves)
    pairTracker.set(evenHalves, copiesOfHalf * (copiesOfHalf - 1))
  }

  const uniquePairs = [...pairTracker.keys()].map(k => {
    const parseNums = k.match(/(-)?\d+/g)
    k = [Number(parseNums[0]), Number(parseNums[1])]
    return k
  })

  const comboPairs = uniquePairs.slice(Math.floor(uniquePairs.length / 2))

  const mapArray = Array.from(pairTracker)

  const allPairs = []
  let start = 0
  let end = mapArray.length - 1
  const leftMid = Math.ceil(mapArray.length / 2 - 1)
  const rightMid = Math.floor(mapArray.length / 2)
  let multiples
 
  while (start <= leftMid && end >= rightMid) {
    if (JSON.stringify(uniquePairs[start]) === JSON.stringify(uniquePairs[end])) {
      multiples = mapArray[start][1] / 2
    } else {
      multiples = mapArray[start][1] * mapArray[end][1]
    }
    for (let i = 1; i <= multiples; i++) {
      allPairs.push(uniquePairs[start])
      allPairs.push(uniquePairs[end])
    }
    start++
    end--
  }

  return { allPairs, uniquePairs, comboPairs }
}

console.log(findPairsYieldingSum([1, 1, 2, 4, 4, 5, 5, 5, 6, 7, 9]))
