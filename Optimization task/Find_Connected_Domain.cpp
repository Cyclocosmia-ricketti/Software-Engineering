#include <iostream>
#include <math.h>
#include "Find_Connected_Domain.h"

#define ARRAYSIZE 30000

int flag = 0;

int ustc_ConnectedComponentLabeling(Mat grayImg, Mat &labelImg,int bin_th, int &len) {
	
	if (NULL == grayImg.data && NULL == labelImg.data) {
		return MY_FAIL;
	}

	int NumArray[ARRAYSIZE] = { 0 };
	int next[ARRAYSIZE] = { 0 };
	int tail[ARRAYSIZE] = { 0 };
	int length = 0;
	len = 0;

	for (int i = 0; i < ARRAYSIZE; i++) {
		NumArray[i] = i;
		next[i] = -1;
		tail[i] = i;
	}

	int height = grayImg.rows;
	int width = grayImg.cols;
	Mat binaryImg(height, width, CV_8UC1);
	//�ԻҶ�ͼ��ֵ��
	threshold(grayImg, binaryImg, bin_th, 1, THRESH_BINARY);
	//������������ĸ�ֱ���1��2��4��8��16��Ȩ
	Mat testImg = binaryImg.clone();
	Mat subimg1 = testImg(Range(1, height), Range(1, width));
	subimg1 = subimg1 + binaryImg(Range(0, height - 1), Range(0, width - 1)) * 16;
	Mat subimg2 = testImg(Range(1, height), Range(0, width));
	subimg2 = subimg2 + binaryImg(Range(0, height - 1), Range(0, width)) * 8;
	Mat subimg3 = testImg(Range(1, height), Range(0, width - 1));
	subimg3 = subimg3 + binaryImg(Range(0, height - 1), Range(1, width)) * 4;
	Mat subimg4 = testImg(Range(0, height), Range(1, width));
	subimg4 = subimg4 + binaryImg(Range(0, height), Range(0, width - 1)) * 2;

	uchar* testImgptr = testImg.data;
	int* connectptr = (int *)labelImg.data;
	int limit = height*width;

	//�����һ��ɨ��
	for (int pos = 0; pos < limit; pos++) {
			int value = testImgptr[pos];
			switch (value) {
			case 1: connectptr[pos] = (++length); break;
			//a
			case 17:connectptr[pos] = connectptr[pos - width - 1]; break;
			//b
			case 9:
			case 25:connectptr[pos] = connectptr[pos - width]; break;
			//c
			case 5:
			case 13:
			case 29:connectptr[pos] = connectptr[pos - width + 1]; break;
			//d
			case 3:
			case 11:
			case 19:
			case 27:connectptr[pos] = connectptr[pos - 1]; break;
			//ac
			case 21:
			{
				int num1 = connectptr[pos - width - 1];
				int num2 = connectptr[pos - width + 1];

				if (num1 == num2) {
					connectptr[pos] = num1;
					break;
				}
				else if (num1 > num2) {
					connectptr[pos] = num2;
				}
				else{
					connectptr[pos] = num1;
				}
				int value1 = NumArray[num1];
				int value2 = NumArray[num2];
				if (value1 < value2) {
					int p = value2;
					while (p != -1) {
						NumArray[p] = value1;
						p = next[p];
					}
					next[tail[value1]] = value2;
					tail[value1] = tail[value2];
				}
				else if (value1>value2) {
					int p = value1;
					while (p != -1) {
						NumArray[p] = value2;
						p = next[p];
					}
					next[tail[value2]] = value1;
					tail[value2] = tail[value1];
				}
				break;
			}
			//cd
			case 7:
			case 15:
			case 23:
			case 31:
			{
				int num1 =  connectptr[pos - 1];
				int num2 =  connectptr[pos -width + 1];

				if (num1 == num2) {
					connectptr[pos] = num1;
					break;
				}
				else if (num1 > num2) {
					connectptr[pos] = num2;
				}
				else {
					connectptr[pos] = num1;
				}
				int value1 = NumArray[num1];
				int value2 = NumArray[num2];
				if (value1 < value2) {
					int p = value2;
					while (p != -1) {
						NumArray[p] = value1;
						p = next[p];
					}
					next[tail[value1]] = value2;
					tail[value1] = tail[value2];
				}
				else if (value1 > value2) {
					int p = value1;
					while (p != -1) {
						NumArray[p] = value2;
						p = next[p];
					}
					next[tail[value2]] = value1;
					tail[value2] = tail[value1];
				}
				break;
			}
			//0
			default:connectptr[pos] = 0; break;
			}
	}

	//����ڶ���ɨ��
	for (int row_col = 0; row_col < limit; row_col++) {
		int value = connectptr[row_col];
		connectptr[row_col] = NumArray[value];
	}
	
	for (int i = length; i > 0; i--) {
		if (NumArray[i] == i) len++;
	}

	return MY_OK;
}