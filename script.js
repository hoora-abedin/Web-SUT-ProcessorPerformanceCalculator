document.addEventListener("DOMContentLoaded", () => {

    function evaluateFormulas() {
        const instructionCount = document.getElementById("instruction-count").value.trim();
        const clockCycleTime = document.getElementById("clock-cycle-time").value.trim();
        const parallelizablePortion = document.getElementById("parallelizable-portion").value.trim();
        const processors = document.getElementById("processors").value.trim();

        const isInvalidInput = 
            validateCommonInput(instructionCount) &&
            validateCommonInput(clockCycleTime) &&
            validateParallelizablePortionInput(parallelizablePortion) &&
            validateCommonInput(processors);

        document.querySelectorAll("formula").forEach(formula => {
            let result = "";

            try {
                if (!isInvalidInput) {
                    result = "invalid formula!";
                } else {
                    const stringifiedFormula = formula.getAttribute("evaluator");
                    const calculator = new Function(
                        "instructionCount", "clockCycleTime", "parallelizablePortion", "processors",
                        `return (${stringifiedFormula});`
                    );
                    result = calculator(instructionCount, clockCycleTime, parallelizablePortion, processors).toFixed(4);
                }
            } catch (e) {
                result = "Formula Error";
            }

            formula.textContent = result;
            setColor(result, formula);
            
        });
    }

    function setColor(result, formula) {
        if (result === "invalid formula!" || result === "unknown error!") {
            formula.style.color = "red";
        } else {
            formula.style.color = "green";
        }
    }

    function validateCommonInput(value) {
        return !isNaN(value) && value > 0;
    }

    function validateParallelizablePortionInput(value) {
        return !isNaN(value) && value >= 0 && value <= 1;
    }
       

    document.querySelectorAll("input, select").forEach(input => {
        input.addEventListener("input", evaluateFormulas); 
    });
});

