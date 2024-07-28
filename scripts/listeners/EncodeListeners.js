// 从文件加载里图
function encodeLoadInnerImageFile(event) {
    errorHandling.currCanvasIndex = 1;
    const file = event.target.files[0];
    updateImageFromFile(file, (img) => {
        PrismProcessor.PrismEncoder.updateInnerImage(img);
    });
    event.target.value = '';
}

// 从文件加载表图
function encodeLoadCoverImageFile(event) {
    errorHandling.currCanvasIndex = 2;
    const file = event.target.files[0];
    updateImageFromFile(file, (img) => {
        PrismProcessor.PrismEncoder.updateCoverImage(img);
    });
    event.target.value = '';
}

// 从剪贴板加载表里图
var mouseX = 0;
function updateMousePosition(event) {
    mouseX = event.clientX;
}
function encodeLoadImageFromClipboard(event) {
    if (mouseX < window.innerWidth / 2) {
        errorHandling.currCanvasIndex = 1;
        updateImageFromClipboard(event, (img) => {
            PrismProcessor.PrismEncoder.updateInnerImage(img);
        });
    } else {
        errorHandling.currCanvasIndex = 2;
        updateImageFromClipboard(event, (img) => {
            PrismProcessor.PrismEncoder.updateCoverImage(img);
        });
    }
}

// 从拖动加载里图
function encodeLoadInnerImageFromDrag(event) {
    errorHandling.currCanvasIndex = 1;
    dragDropLoadImage(event, (img) => {
        PrismProcessor.PrismEncoder.updateInnerImage(img);
    });
}

// 从拖动加载表图
function encodeLoadCoverImageFromDrag(event) {
    errorHandling.currCanvasIndex = 2;
    dragDropLoadImage(event, (img) => {
        PrismProcessor.PrismEncoder.updateCoverImage(img);
    });
}

const innerSlider = document.getElementById('innerThresholdRange');
const coverSlider = document.getElementById('coverThresholdRange');
const innerInput = document.getElementById('innerThresholdInput');
const coverInput = document.getElementById('coverThresholdInput');

// 设置里图色阶
function encodeSetInnerThreshold() {
    const slider = innerSlider
    const text = innerInput;
    PrismProcessor.PrismEncoder.innerThreshold = parseInt(slider.value, 10);
    text.value = PrismProcessor.PrismEncoder.innerThreshold;
    if (PrismProcessor.PrismEncoder.innerThreshold > PrismProcessor.PrismEncoder.coverThreshold) {
        PrismProcessor.PrismEncoder.innerThreshold = PrismProcessor.PrismEncoder.coverThreshold;
        slider.value = PrismProcessor.PrismEncoder.coverThreshold;
        text.value = PrismProcessor.PrismEncoder.coverThreshold;
        text.style.color = '#ff5e5e';
    } else {
        const rootStyles = getComputedStyle(document.documentElement);
        const frontColor = rootStyles.getPropertyValue('--front-color').trim();
        text.style.color = frontColor;
    }
    if (PrismProcessor.PrismEncoder.innerImg && PrismProcessor.PrismEncoder.coverImg) {
        PrismProcessor.PrismEncoder.processImage();
    }
}

// 设置表图色阶
function encodeSetCoverThreshold() {
    const slider = coverSlider;
    const text = coverInput;
    PrismProcessor.PrismEncoder.coverThreshold = parseInt(slider.value, 10);
    text.value = PrismProcessor.PrismEncoder.coverThreshold;
    if (PrismProcessor.PrismEncoder.innerThreshold > PrismProcessor.PrismEncoder.coverThreshold) {
        PrismProcessor.PrismEncoder.coverThreshold = PrismProcessor.PrismEncoder.innerThreshold;
        slider.value = PrismProcessor.PrismEncoder.innerThreshold;
        text.value = PrismProcessor.PrismEncoder.innerThreshold;
        text.style.color = '#ff5e5e';
    } else {
        const rootStyles = getComputedStyle(document.documentElement);
        const frontColor = rootStyles.getPropertyValue('--front-color').trim();
        text.style.color = frontColor;
    }
    if (PrismProcessor.PrismEncoder.innerImg && PrismProcessor.PrismEncoder.coverImg) {
        PrismProcessor.PrismEncoder.processImage();
    }
}

// 设置里图色阶输入
let innerInputTimeout;
function encodeSetInnerThresholdInput() {
    clearTimeout(innerInputTimeout);
    setTimeout(function () {
        const input = innerInput;
        const slider = innerSlider;
        input.style.color = '#dfdfdf';
        const inputVal = parseInt(input.value, 10);
        if (isNaN(inputVal)) {
            return;
        }
        PrismProcessor.PrismEncoder.innerThreshold = inputVal;
        if (PrismProcessor.PrismEncoder.innerThreshold > 128) {
            PrismProcessor.PrismEncoder.innerThreshold = 128;
            input.value = 128;
        } else if (PrismProcessor.PrismEncoder.innerThreshold < 0) {
            PrismProcessor.PrismEncoder.innerThreshold = 0;
            input.value = 0;
        }
        slider.value = PrismProcessor.PrismEncoder.innerThreshold;
        if (PrismProcessor.PrismEncoder.innerThreshold > PrismProcessor.PrismEncoder.coverThreshold) {
            PrismProcessor.PrismEncoder.innerThreshold = PrismProcessor.PrismEncoder.coverThreshold;
            slider.value = PrismProcessor.PrismEncoder.coverThreshold;
            input.value = PrismProcessor.PrismEncoder.coverThreshold;
        }
        if (PrismProcessor.PrismEncoder.innerImg && PrismProcessor.PrismEncoder.coverImg) {
            PrismProcessor.PrismEncoder.processImage();
        }
    }, 500);
}

// 设置表图色阶输入
let coverInputTimeout;
function encodeSetCoverThresholdInput() {
    clearTimeout(coverInputTimeout);
    setTimeout(function () {
        const input = coverInput;
        const slider = coverSlider;
        input.style.color = '#dfdfdf';
        const inputVal = parseInt(input.value, 10);
        if (isNaN(inputVal)) {
            return;
        }
        PrismProcessor.PrismEncoder.coverThreshold = inputVal;
        if (PrismProcessor.PrismEncoder.coverThreshold > 128) {
            PrismProcessor.PrismEncoder.coverThreshold = 128;
            input.value = 128;
        } else if (PrismProcessor.PrismEncoder.coverThreshold < 0) {
            PrismProcessor.PrismEncoder.coverrThreshold = 0;
            input.value = 0;
        }
        slider.value = PrismProcessor.PrismEncoder.coverThreshold;
        if (PrismProcessor.PrismEncoder.innerThreshold > PrismProcessor.PrismEncoder.coverThreshold) {
            PrismProcessor.PrismEncoder.coverThreshold = PrismProcessor.PrismEncoder.innerThreshold;
            slider.value = PrismProcessor.PrismEncoder.coverThreshold;
            input.value = PrismProcessor.PrismEncoder.coverThreshold;
        }
        if (PrismProcessor.PrismEncoder.innerImg && PrismProcessor.PrismEncoder.coverImg) {
            PrismProcessor.PrismEncoder.processImage();
        }
    }, 500);
}

// 设置里图对比度
function encodeSetInnerContrast(event) {
    PrismProcessor.PrismEncoder.innerContrast = parseInt(event.target.value, 10);
    if (PrismProcessor.PrismEncoder.innerImg) {
        PrismProcessor.PrismEncoder.adjustInnerContrast();
        if (PrismProcessor.PrismEncoder.coverImg) {
            PrismProcessor.PrismEncoder.processImage();
        }
    }
}

// 重置里图对比度
function resetInnerContrast() {
    PrismProcessor.PrismEncoder.innerContrast = 50;
    document.getElementById('innerContrastRange').value = 50;
    if (PrismProcessor.PrismEncoder.innerImg) {
        PrismProcessor.PrismEncoder.adjustInnerContrast();
        if (PrismProcessor.PrismEncoder.coverImg) {
            PrismProcessor.PrismEncoder.processImage();
        }
    }
}

// 设置表图是否取灰度
function encodeSetCoverGray(event) {
    PrismProcessor.PrismEncoder.isCoverGray = event.target.checked;
    if (PrismProcessor.PrismEncoder.coverImg && PrismProcessor.PrismEncoder.innerImg) {
        PrismProcessor.PrismEncoder.updateCoverImage(PrismProcessor.PrismEncoder.coverImg);
    }
}

// 设置是否反向隐写
function encodeSetEncodeReverse(event) {
    PrismProcessor.PrismEncoder.isEncodeReverse = event.target.checked;
    if (PrismProcessor.PrismEncoder.innerImg && PrismProcessor.PrismEncoder.coverImg) {
        PrismProcessor.PrismEncoder.processImage();
    }
}

// 设置是否表图幻影
function encodeSetCoverMirage(event) {
    PrismProcessor.PrismEncoder.isCoverMirage = event.target.checked;
    if (PrismProcessor.PrismEncoder.coverImg && PrismProcessor.PrismEncoder.innerImg) {
        PrismProcessor.PrismEncoder.processImage();
    }
    if (event.target.checked) {
        document.getElementById('isPngCheckBox').checked = true;
        applicationState.isPng = true;
    }
}

// 设置像素混合方式
function encodeSetMethod(event) {
    PrismProcessor.PrismEncoder.method = event.target.value;
    if (PrismProcessor.PrismEncoder.innerImg && PrismProcessor.PrismEncoder.coverImg) {
        PrismProcessor.PrismEncoder.updateInnerImage(PrismProcessor.PrismEncoder.innerImg);
    }
}

// 设置输出图像大小
let sizeInputTimeout;
function encodeSetSize(event) {
    clearTimeout(sizeInputTimeout);

    sizeInputTimeout = setTimeout(function () {
        PrismProcessor.PrismEncoder.size = parseInt(event.target.value, 10);
        if (isNaN(PrismProcessor.PrismEncoder.size)) {
            return;
        }
        if (PrismProcessor.PrismEncoder.size > applicationState.defaultArguments.maxSize) {
            PrismProcessor.PrismEncoder.size = applicationState.defaultArguments.maxSize;
            event.target.value = applicationState.defaultArguments.maxSize;
        } else if (PrismProcessor.PrismEncoder.size < applicationState.defaultArguments.minSize) {
            PrismProcessor.PrismEncoder.size = applicationState.defaultArguments.minSize;
            event.target.value = applicationState.defaultArguments.minSize;
        }
        if (PrismProcessor.PrismEncoder.innerImg) {
            PrismProcessor.PrismEncoder.updateInnerImage(PrismProcessor.PrismEncoder.innerImg);
        }
    }, 500);
}

// 设置保存类型
function setSaveType(event) {
    applicationState.isPng = event.target.checked;
}

// 保存图像
function encodeSaveImage() {
    saveImageFromCanvas('outputCanvas', applicationState.isPng, true);
}

// 以当前结果跳转显形界面
function jumpToDecode() {
    if (PrismProcessor.PrismEncoder.innerImg && PrismProcessor.PrismEncoder.coverImg) {
        setDecodeValues(
            PrismProcessor.PrismEncoder.isEncodeReverse,
            PrismProcessor.PrismEncoder.innerThreshold,
            PrismProcessor.PrismEncoder.innerContrast
        );
        const img = new Image();
        img.src = generateUrlFromCanvas('outputCanvas', applicationState.isPng, false);
        img.onload = function () {
            PrismProcessor.PrismDecoder.updateImage(img);
            switchPage();
        };
    }
}

// 设置编码事件监听器
function encodeSetUpEventListeners() {

    document.getElementById('decodeButton').addEventListener('click', switchPage);

    document.getElementById('innerSourceFileInput').addEventListener('change', encodeLoadInnerImageFile);
    document.getElementById('coverSourceFileInput').addEventListener('change', encodeLoadCoverImageFile);
    if (!applicationState.isOnPhone) {
        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('paste', encodeLoadImageFromClipboard);

        document.getElementById('innerCanvas').addEventListener('drop', encodeLoadInnerImageFromDrag);
        document.getElementById('coverCanvas').addEventListener('drop', encodeLoadCoverImageFromDrag);
    } else {
        // document.getElementById('innerThresholdRange').addEventListener('touchstart', disableScroll);
        // document.getElementById('coverThresholdRange').addEventListener('touchstart', disableScroll);
        // document.getElementById('innerContrastRange').addEventListener('touchstart', disableScroll);
    }

    document.getElementById('innerThresholdRange').addEventListener('input', encodeSetInnerThreshold);
    document.getElementById('coverThresholdRange').addEventListener('input', encodeSetCoverThreshold);
    document.getElementById('innerThresholdInput').addEventListener('input', encodeSetInnerThresholdInput);
    document.getElementById('coverThresholdInput').addEventListener('input', encodeSetCoverThresholdInput);
    document.getElementById('innerContrastRange').addEventListener('input', encodeSetInnerContrast);
    document.getElementById('innerResetContrastButton').addEventListener('click', resetInnerContrast);

    document.getElementById('isCoverGrayCheckBox').addEventListener('change', encodeSetCoverGray);
    document.getElementById('isEncodeReverseCheckBox').addEventListener('change', encodeSetEncodeReverse);
    document.getElementById('isCoverMirageCheckBox').addEventListener('change', encodeSetCoverMirage);

    document.getElementById('encodeMethodSelect').addEventListener('change', encodeSetMethod);
    document.getElementById('encodeSizeInput').addEventListener('input', encodeSetSize);

    document.getElementById('isPngCheckBox').addEventListener('change', setSaveType);
    document.getElementById('jumpToDecodeButton').addEventListener('click', jumpToDecode);
    document.getElementById('encodeSaveImageButton').addEventListener('click', encodeSaveImage);
}

// 移除编码事件监听器
function encodeRemoveEventListeners() {
    document.getElementById('decodeButton').removeEventListener('click', switchPage);
    document.getElementById('innerSourceFileInput').removeEventListener('change', encodeLoadInnerImageFile);
    document.getElementById('coverSourceFileInput').removeEventListener('change', encodeLoadCoverImageFile);
    if (!applicationState.isOnPhone) {
        window.removeEventListener('mousemove', updateMousePosition);
        window.removeEventListener('paste', encodeLoadImageFromClipboard);
        document.getElementById('innerCanvas').removeEventListener('drop', encodeLoadInnerImageFromDrag);
        document.getElementById('coverCanvas').removeEventListener('drop', encodeLoadCoverImageFromDrag);
    } else {
        // document.getElementById('innerContrastRange').removeEventListener('touchstart', disableScroll);
        // document.getElementById('innerThresholdRange').removeEventListener('touchstart', disableScroll);
        // document.getElementById('coverThresholdRange').removeEventListener('touchstart', disableScroll);
    }
    document.getElementById('innerThresholdRange').removeEventListener('input', encodeSetInnerThreshold);
    document.getElementById('coverThresholdRange').removeEventListener('input', encodeSetCoverThreshold);
    document.getElementById('innerThresholdInput').removeEventListener('input', encodeSetInnerThresholdInput);
    document.getElementById('coverThresholdInput').removeEventListener('input', encodeSetCoverThresholdInput);
    document.getElementById('innerContrastRange').removeEventListener('input', encodeSetInnerContrast);
    document.getElementById('innerResetContrastButton').removeEventListener('click', resetInnerContrast);
    document.getElementById('isCoverGrayCheckBox').removeEventListener('change', encodeSetCoverGray);
    document.getElementById('isEncodeReverseCheckBox').removeEventListener('change', encodeSetEncodeReverse);
    document.getElementById('isCoverMirageCheckBox').removeEventListener('change', encodeSetCoverMirage);
    document.getElementById('encodeMethodSelect').removeEventListener('change', encodeSetMethod);
    document.getElementById('encodeSizeInput').removeEventListener('input', encodeSetSize);
    document.getElementById('isPngCheckBox').removeEventListener('change', setSaveType);
    document.getElementById('jumpToDecodeButton').removeEventListener('click', jumpToDecode);
    document.getElementById('encodeSaveImageButton').removeEventListener('click', encodeSaveImage);
}

errorHandling.scriptsLoaded.EncodeListeners = true;