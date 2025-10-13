'use client';

import React, { createContext, useContext, useState, useMemo, ReactNode, FC } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';

// --- TYPE DEFINITIONS ---
interface StepConfig {
    title: string;
}

interface StepperContextProps {
    currentStep: number;
    totalSteps: number;
    steps: StepConfig[];
    isFirstStep: boolean;
    isLastStep: boolean;
    goToNextStep: () => void;
    goToPrevStep: () => void;
}

interface StepperProps {
    children: ReactNode;
    totalSteps: number;
    initialStep?: number;
    steps: StepConfig[];
    onStepChange?: (step: number) => void;
}

interface StepProps {
    index: number;
    children: ReactNode;
}

interface ButtonProps {
    text?: string;
    icon?: ReactNode;
    className?: string;
    onClick?: () => void;
    children?: ReactNode;
    disabled?: boolean;
}

// --- CONTEXT ---
const StepperContext = createContext<StepperContextProps | undefined>(undefined);

const useStepper = () => {
    const context = useContext(StepperContext);
    if (!context) {
        throw new Error('useStepper must be used within a Stepper provider');
    }
    return context;
};

// --- MAIN PROVIDER COMPONENT ---
const StepperProvider: FC<StepperProps> = ({ children, totalSteps, initialStep = 1, steps, onStepChange }) => {
    const [currentStep, setCurrentStep] = useState(initialStep);

    React.useEffect(() => {
        onStepChange?.(currentStep);
    }, [currentStep, onStepChange]);

    const isFirstStep = currentStep === 1;
    const isLastStep = currentStep === totalSteps;

    const goToNextStep = () => !isLastStep && setCurrentStep(prev => prev + 1);
    const goToPrevStep = () => !isFirstStep && setCurrentStep(prev => prev - 1);

    const value = useMemo(() => ({
        currentStep,
        totalSteps,
        steps,
        isFirstStep,
        isLastStep,
        goToNextStep,
        goToPrevStep,
    }), [currentStep, totalSteps, steps, isFirstStep, isLastStep]);

    return <StepperContext.Provider value={value}>{children}</StepperContext.Provider>;
};

// --- COMPOUND COMPONENTS ---

const Nav: FC<{className?: string}> = ({ className }) => {
    const { steps, currentStep } = useStepper();
    if (!steps || steps.length === 0) return null;

    return (
        <ul className={`relative flex flex-col gap-2 md:flex-row ${className}`}>
            {steps.map((step, index) => {
                const stepNumber = index + 1;
                const isActive = currentStep === stepNumber;
                const isCompleted = currentStep > stepNumber;

                let statusClass = 'text-bg-soft-neutral';
                if (isActive) statusClass = 'stepper-active:text-bg-primary stepper-active:shadow-sm shadow-base-300/20';
                if (isCompleted) statusClass = 'stepper-completed:text-bg-success';

                return (
                    <li key={stepNumber} className="group flex flex-1 flex-col items-center gap-2 md:flex-row">
                        <span className="min-h-7.5 min-w-7.5 inline-flex flex-col items-center gap-2 align-middle text-sm md:flex-row">
                            <span className={`${statusClass} flex size-7.5 shrink-0 items-center justify-center rounded-full font-medium`}>
                                {isCompleted ? (
                                    <span className="icon-[tabler--check] size-4 shrink-0"></span>
                                ) : (
                                    <span className="text-sm">{stepNumber}</span>
                                )}
                            </span>
                            <span className="text-base-content text-nowrap font-medium">{step.title}</span>
                        </span>
                        {index < steps.length - 1 && (
                            <div className={`${isCompleted ? 'stepper-completed:bg-success' : 'bg-base-content/20'} h-px w-full group-last:hidden max-md:mt-2 max-md:h-8 max-md:w-px md:flex-1`}></div>
                        )}
                    </li>
                );
            })}
        </ul>
    );
};

const Content: FC<{ children: ReactNode }> = ({ children }) => <>{children}</>;

const Step: FC<StepProps> = ({ index, children }) => {
    const { currentStep } = useStepper();
    return <div className={currentStep === index ? '' : 'invisible h-0 overflow-hidden'}>{children}</div>;
};

const Controls: FC<{ children: ReactNode, className?: string }> = ({ children, className }) => (
    <div className={`mt-5 flex items-center justify-between gap-x-2 ${className}`}>
        {children}
    </div>
);

const PrevButton: FC<ButtonProps> = ({ text = 'Kembali', icon, className, onClick, disabled }) => {
    const { goToPrevStep, isFirstStep } = useStepper();
    if (isFirstStep) return null;

    return (
        <button type="button" className={`btn btn-prev ${className}`} onClick={onClick || goToPrevStep} disabled={disabled}>
            {icon || <Icon icon="tabler:chevron-left" width="24" height="24" className="text-primary-content size-5 rtl:rotate-180" />}
            <span>{text}</span>
        </button>
    );
};

const NextButton: FC<ButtonProps> = ({ text = 'Lanjutkan', icon, className, onClick, disabled }) => {
    const { goToNextStep, isLastStep } = useStepper();
    if (isLastStep) return null;

    return (
        <button type="button" className={`btn btn-next w-full justify-between rounded-sm ${className}`} onClick={onClick || goToNextStep} disabled={disabled}>
            <span>{text}</span>
            {icon || <Icon icon="tabler:chevron-right" width="24" height="24" className="text-primary-content size-5 rtl:rotate-180" />}
        </button>
    );
};

const FinishButton: FC<{ children: ReactNode }> = ({ children }) => {
    const { isLastStep } = useStepper();
    return isLastStep ? <>{children}</> : null;
};

// Main Stepper component that ties everything together
export const Stepper: FC<StepperProps> & {
    Nav: typeof Nav;
    Content: typeof Content;
    Step: typeof Step;
    Controls: typeof Controls;
    PrevButton: typeof PrevButton;
    NextButton: typeof NextButton;
    FinishButton: typeof FinishButton;
} = (props) => {
    return (
        <StepperProvider {...props}>
            {props.children}
        </StepperProvider>
    );
};

Stepper.Nav = Nav;
Stepper.Content = Content;
Stepper.Step = Step;
Stepper.Controls = Controls;
Stepper.PrevButton = PrevButton;
Stepper.NextButton = NextButton;
Stepper.FinishButton = FinishButton;
