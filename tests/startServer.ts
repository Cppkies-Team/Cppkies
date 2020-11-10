import * as cp from "child_process"
let server: cp.ChildProcess = null
beforeAll(() => (server = cp.exec("npx serve . -p 5501")))
afterAll(() => server.kill())
