import { configMsg, run } from '../index'
import * as core from '@actions/core'
import { Errors } from '../../../../types/app.types'

describe('Apply chnages', () => {
    const OLD_ENV = process.env
    beforeEach(() => {
        jest.resetModules() // most important - it clears the cache
        jest.clearAllMocks()
        jest.clearAllTimers()
        process.env = { ...OLD_ENV } // make a copy

        jest.spyOn(core, 'setFailed')
    })

    afterAll(() => {
        process.env = OLD_ENV // restore old env
    })

    it('fails without creds', () => {
        // simulate the secrets are not set
        process.env = {}
        const errors = [Errors.USERNAME, Errors.PASSWORD, Errors.INSTANCE, Errors.APPSYSID].join('. ')

        run()

        expect(core.setFailed).toHaveBeenCalledWith(`${errors}${configMsg}`)
    })

    it('success with creds', () => {
        // do not set process env
        // workflow run the tests
        // it will take envs from the workflow
        run()
        expect(core.setFailed).not.toHaveBeenCalled()
    })
})