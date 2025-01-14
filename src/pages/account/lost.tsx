import React, { useState, useRef, useCallback } from "react";
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	Heading,
	Flex,
	FormHelperText,
	Progress,
	Stack,
	Radio,
	RadioGroup,
	useToast,
} from "@chakra-ui/react";
import Panel from "../../components/Panel";
import { fetchApi } from "../../lib/request";

const Step1 = ({ setSelectedOption }: any) => {
	return (
		<>
			<Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
				Account Recovery
			</Heading>
			<Flex flexDirection="column" alignItems="start">
				<FormControl as="fieldset">
					<FormLabel as="legend" fontWeight={"normal"}>
						Select a recovery option
					</FormLabel>
					<RadioGroup onChange={setSelectedOption}>
						<Stack spacing={4} direction="column" align="start">
							<Radio value="1">
								Lost your PASSWORD? Click here.
								<FormHelperText>(Your password will be reset and the new password will be sent to your registered email)</FormHelperText>
							</Radio>
							<Radio value="2">
								Recover account using RECOVERY KEY, details will be sent to your registered email. Click here.
								<FormHelperText>
									(This method will recover your account by resetting the password and will disable the Two-Factor Authentication)
								</FormHelperText>
							</Radio>
							<Radio value="3">
								Recover account using RECOVERY KEY and ACCOUNT NAME OR EMAIL, details will be appear on screen. Click here.
								<FormHelperText>
									(This method will recover your account by resetting the password and will disable the Two-Factor Authentication)
								</FormHelperText>
							</Radio>
						</Stack>
					</RadioGroup>
				</FormControl>
			</Flex>
		</>
	);
};

const Step2 = ({ selectedOption, refs }: any) => {
	const { emailRef, characterNameRef, accountNameRef, recoveryKeyRef, accountOrEmailRef } = refs;

	return (
		<>
			{selectedOption === "1" && (
				<>
					<Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
						Account Recovery
					</Heading>
					<FormControl mt="2%">
						<FormLabel fontWeight={"normal"}>Email</FormLabel>
						<Input type="email" ref={emailRef} />
					</FormControl>
					<FormControl mt="2%">
						<FormLabel fontWeight={"normal"}>Character Name</FormLabel>
						<Input type="text" ref={characterNameRef} />
					</FormControl>
					<FormControl mt="2%">
						<FormLabel fontWeight={"normal"}>Account Name</FormLabel>
						<Input type="text" ref={accountNameRef} />
					</FormControl>
				</>
			)}
			{selectedOption === "2" && (
				<FormControl mt="2%">
					<FormLabel fontWeight={"normal"}>Recovery Key</FormLabel>
					<Input type="text" ref={recoveryKeyRef} />
				</FormControl>
			)}
			{selectedOption === "3" && (
				<>
					<FormControl mt="2%">
						<FormLabel fontWeight={"normal"}>Recovery Key</FormLabel>
						<Input type="text" ref={recoveryKeyRef} />
					</FormControl>
					<FormControl mt="2%">
						<FormLabel fontWeight={"normal"}>Account Name or Email</FormLabel>
						<Input type="text" ref={accountOrEmailRef} />
					</FormControl>
				</>
			)}
		</>
	);
};

const Step3 = () => {
	return (
		<>
			<Heading w="100%" textAlign={"center"} fontWeight="normal">
				Thank You!
			</Heading>
			<Box textAlign={"center"} mt={4}>
				Your request for account recovery has been received. An email with further instructions has been sent to your registered email address. Please
				check your email to complete the recovery process.
			</Box>
		</>
	);
};

export default function Lost() {
	const [step, setStep] = useState(1);
	const [progress, setProgress] = useState(0);
	const [selectedOption, setSelectedOption] = useState<string | null>();

	const toast = useToast();

	const emailRef = useRef<HTMLInputElement>();
	const characterNameRef = useRef<HTMLInputElement>();
	const accountNameRef = useRef<HTMLInputElement>();
	const recoveryKeyRef = useRef<HTMLInputElement>();
	const accountOrEmailRef = useRef<HTMLInputElement>();

	const next = useCallback(async () => {
		if (step === 1 && selectedOption === null) {
			toast({
				position: "top",
				title: "Error.",
				description: "Please select a recovery option before proceeding.",
				status: "error",
				duration: 9000,
				isClosable: true,
			});
			return;
		}

		if (step === 2) {
			let requestBody = {};

			if (selectedOption === "1") {
				if (!emailRef.current?.value || !characterNameRef.current?.value || !accountNameRef.current?.value) {
					toast({
						position: "top",
						title: "Error.",
						description: "Please fill out all required fields for this recovery option.",
						status: "error",
						duration: 9000,
						isClosable: true,
					});
					return;
				}

				requestBody = {
					email: emailRef.current?.value,
					characterName: characterNameRef.current?.value,
					accountName: accountNameRef.current?.value,
					type: selectedOption,
				};
			} else if (selectedOption === "2") {
				if (!recoveryKeyRef.current?.value) {
					toast({
						position: "top",
						title: "Error.",
						description: "Please enter your recovery key for this option.",
						status: "error",
						duration: 9000,
						isClosable: true,
					});
					return;
				}

				requestBody = {
					recoveryKey: recoveryKeyRef.current?.value,
					type: selectedOption,
				};
			} else if (selectedOption === "3") {
				if (!recoveryKeyRef.current?.value || !accountOrEmailRef.current?.value) {
					toast({
						position: "top",
						title: "Error.",
						description: "Please fill out all required fields for this recovery option.",
						status: "error",
						duration: 9000,
						isClosable: true,
					});
					return;
				}

				requestBody = {
					recoveryKey: recoveryKeyRef.current?.value,
					accountOrEmail: accountOrEmailRef.current?.value,
					type: selectedOption,
				};
			}

			try {
				const response = await fetchApi("POST", "/api/account/lostaccount", {
					data: requestBody,
				});

				if (response.success) {
					console.log("Success:", response);
				} else {
					console.error("Error:", response.message);
					toast({
						position: "top",
						title: "Error.",
						description: response.message,
						status: "error",
						duration: 9000,
						isClosable: true,
					});
					return;
				}
			} catch (error) {
				console.error("Error:", error);
				toast({
					position: "top",
					title: "Error.",
					description: "An unexpected error occurred.",
					status: "error",
					duration: 9000,
					isClosable: true,
				});
				return;
			}
		}

		if (step < 3) {
			setStep((prevStep) => prevStep + 1);
			setProgress((prevProgress) => prevProgress + 33.33);
		} else {
			setStep(1);
			setProgress(0);
			setSelectedOption(null);
			toast({
				position: "top",
				title: "Thank You!",
				description: "Your account recovery request has been submitted successfully. Please check your email for further instructions.",
				status: "success",
				duration: 9000,
				isClosable: true,
			});
		}
	}, [step, selectedOption]);

	const prev = useCallback(() => {
		if (step > 1) {
			setStep((prevStep) => prevStep - 1);
			setProgress((prevProgress) => prevProgress - 33.33);
		}
	}, [step, selectedOption, toast]);

	const refs = {
		emailRef,
		characterNameRef,
		accountNameRef,
		recoveryKeyRef,
		accountOrEmailRef,
	};

	return (
		<Panel header="Lost Account">
			<Box width={"50%"} mx={"auto"} my={"2%"}>
				<Progress colorScheme="teal" size="lg" value={progress} />
			</Box>
			<Box width={"50%"} mx={"auto"}>
				{step === 1 && <Step1 refs={refs} setSelectedOption={setSelectedOption} />}
				{step === 2 && <Step2 selectedOption={selectedOption} refs={refs} />}
				{step === 3 && <Step3 />}
			</Box>
			<Box width={"50%"} mx={"auto"} my={"2%"} justifyContent={"space-between"}>
				<Button w="7rem" isDisabled={step === 1} onClick={prev} colorScheme="teal" variant="outline">
					Prev
				</Button>
				<Button w="7rem" isDisabled={step === 3} onClick={next} colorScheme="teal" variant="outline">
					Next
				</Button>
			</Box>
		</Panel>
	);
}
