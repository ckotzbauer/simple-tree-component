import { initialize, beforeEachTest } from "../../test-utils";
import { calculate } from "../../ui/overlay-placement";

const ctx = initialize();

describe("overlay-placement", () => {
    beforeEach(() => beforeEachTest(ctx));

    describe("calculation", () => {
        it("should place dropdown below", () => {
            const rect = calculate(
                {
                    top: 775,
                    height: 20,
                    left: 10,
                    width: 100,
                },
                1000,
                200
            );

            expect(rect).toEqual({ top: 795, height: 200, left: 10, width: 100 });
        });

        it("should place dropdown above", () => {
            const rect = calculate(
                {
                    top: 795,
                    height: 20,
                    left: 10,
                    width: 100,
                },
                1000,
                200
            );

            expect(rect).toEqual({ top: 595, height: 200, left: 10, width: 100 });
        });

        it("should scaling down dropdown", () => {
            const rect = calculate(
                {
                    top: 40,
                    height: 20,
                    left: 10,
                    width: 100,
                },
                250,
                300,
                200
            );

            expect(rect).toEqual({ top: 60, height: 190, left: 10, width: 100 });
        });
    });
});
