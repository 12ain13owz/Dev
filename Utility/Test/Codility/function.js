function Binary(x) {
    if (x <= 1) return x
    else {
        let y = Math.floor(x / 2)

        if (x <= 1) return x = 0
        else {
            x = x % 2 + ''
            return x = Binary(y) + x
        }
    }
}

function BinaryGap(x) {
    let q = 0
    let r = 0

    if (x <= 1) return 0
    else {
        for (let i of x) {
            if (i == 1) {
                if (q < r) q = r
                r = 0
            } else if (i == 0) r++
        }
    }
    return q
}

function CyclicRotation(x, n) {
    if (x.length > 0) {
        for (let i = 0; i < n; i++) {
            let back = x[x.length - 1]
            x.pop()
            x.unshift(back)
        }
    }
    return x
}

function FrogJmp(x, y, n) {
    let q = Math.ceil(((y - x) / n))

    return q
}

function PermMissingElem(x) {
    let q = x.sort((a, b) => { return a - b })
    let n = 1

    for (let i of q) {
        if (n != i) break
        else n++
    }
    return n
}

function TapeEquilibrium(x) {
    if (A.length == 1) return Math.abs(A[0])
    else if (A.length == 2) return Math.abs(A[0] - A[1])
    else {
        let left = 0,
            right = 0,
            sum = 0,
            q = 0

        for (let i of A) right += i

        if (right == 0) q = Math.abs(right - A[1])
        else q = Math.abs(right)

        for (let i = 1; i < (A.length - 1); i++) {
            left += A[i - 1]
            right -= A[i - 1]
            sum = Math.abs(left - right)

            if (q > sum) q = sum
        }
        return q
    }
}
