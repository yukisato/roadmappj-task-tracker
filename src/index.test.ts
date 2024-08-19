import { describe, it } from "node:test";
import { run } from "./index";
import assert from "node:assert";

describe("index", () => {
    describe("accepts subcommands as a second argument", () => {
        it("throws error if subcommand is not passed", () => {
            let isErrorThrown = false;
            try {
                run();
            } catch (error) {
                isErrorThrown = true;
            }
            assert.equal(true, isErrorThrown);
        });
        describe("throws error if 'none' is given as a subcommand", () => {
            let isErrorThrown = false;
            try {
                run("none");
            } catch (error) {
                isErrorThrown = true;
            }
            assert.equal(true, isErrorThrown);
        });
        describe("runs a command if specified subcommand exists", () => {
            it("runs 'dummy' command if 'dummy' is passed", () => {
                const result = run("dummy");
                assert.equal("ok", result);
            });
        });
    });
})