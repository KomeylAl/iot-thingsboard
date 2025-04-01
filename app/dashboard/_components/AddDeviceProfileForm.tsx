"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import StepWizard from "react-step-wizard";
import profileSchema from "./DeviceProfileSchema";

const AddDeviceProfileForm = () => {
  const [wizard, setWizard] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState(1);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(profileSchema),
  });

  return (
    <div className="flex flex-col items-start gap-8 w-96 overflow-hidden">
      <StepWizard
        instance={setWizard}
        onStepChange={({ activeStep }) => setCurrentStep(activeStep)}
      >
        <Step1 control={control} wizard={wizard}/>
        <Step2 control={control} wizard={wizard}/>
      </StepWizard>
      
    </div>
  );
};

const Step1 = ({ control, wizard }: any) => (
   <div>
     <h2 className="text-xl font-semibold mb-4">مشخصات کلی</h2>
     <Controller name="name" control={control} render={({ field }) => <input placeholder="نام دستگاه" {...field} />} />
     <Controller name="description" control={control} render={({ field }) => <input placeholder="توضیحات" {...field} />} />
     <button onClick={() => wizard.nextStep()}>بعدی</button>
   </div>
 );
 
 const Step2 = ({ control, wizard }: any) => (
   <div>
     <h2 className="text-xl font-semibold mb-4">پیکربندی</h2>
     <Controller name="profileData.configuration.type" control={control} render={({ field }) => <input placeholder="نوع پیکربندی" {...field} />} />
     <button onClick={() => wizard.previousStep()}>قبلی</button>
     <button onClick={() => wizard.nextStep()}>بعدی</button>
   </div>
 );

export default AddDeviceProfileForm;
