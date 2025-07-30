import {
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { InputFieldProps } from "@/types/type";

const InputField = ({
  label,
  icon,
  secureTextEntry = false,
  labelStyle = "",
  containerStyle = "",
  inputStyle = "",
  iconStyle = "",
  className = "",
  ...props
}: InputFieldProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className={`w-full ${className}`}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="mb-6 relative w-full">
          {/* Label positioned over top border */}
          {label && (
            <Text
              className={`absolute -top-3 left-4 bg-white px-1 text-sm text-gray-500 z-10 ${labelStyle}`}
            >
              {label}
            </Text>
          )}

          {/* Input box */}
          <View
            className={`flex-row items-center border border-gray-300 rounded-xl px-4 py-3 bg-white ${containerStyle}`}
          >
            {icon && (
              <Image
                source={icon}
                className={`w-5 h-5 mr-3 ${iconStyle}`}
                resizeMode="contain"
              />
            )}
            <TextInput
              secureTextEntry={secureTextEntry}
              className={`text-base text-black font-semibold flex-1 ${inputStyle}`}
              placeholderTextColor="#999"
              {...props}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField;
